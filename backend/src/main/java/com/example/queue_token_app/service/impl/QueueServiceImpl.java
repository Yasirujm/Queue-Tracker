package com.example.queue_token_app.service.impl;

import com.example.queue_token_app.dto.*;
import com.example.queue_token_app.entity.Queue;
import com.example.queue_token_app.entity.QueueEntry;
import com.example.queue_token_app.entity.User;
import com.example.queue_token_app.repository.QueueEntryRepository;
import com.example.queue_token_app.repository.QueueRepository;
import com.example.queue_token_app.repository.UserRepository;
import com.example.queue_token_app.service.QueueService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QueueServiceImpl implements QueueService {

    private final QueueRepository queueRepository;
    private final QueueEntryRepository queueEntryRepository;
    private final UserRepository userRepository;

    @Override
    public List<ServiceQueueResponse> getActiveQueues() {

        List<ActiveQueueResponse> flatList = queueRepository.findActiveQueues();

        Map<Long, ServiceQueueResponse> grouped = new LinkedHashMap<>();

        for (ActiveQueueResponse item : flatList) {

            // If service not exists → create it
            grouped.computeIfAbsent(item.getServiceId(), id ->
                    ServiceQueueResponse.builder()
                            .serviceId(item.getServiceId())
                            .serviceName(item.getServiceName())
                            .location(item.getLocation())
                            .avgServiceTime(item.getAvgServiceTime())
                            .queues(new ArrayList<>())
                            .build()
            );

            // Add queue under service
            grouped.get(item.getServiceId()).getQueues().add(
                    QueueData.builder()
                            .queueId(item.getQueueId())
                            .currentToken(item.getCurrentToken())
                            .queueStatus(item.getQueueStatus())
                            .build()
            );
        }

        return new ArrayList<>(grouped.values());
    }

    @Transactional
    @Override
    public JoinQueueResponse joinQueue(JoinQueueRequest request) {

        // 1. Lock queue row
        Queue queue = queueRepository
                .findActiveQueueForUpdate(request.getQueueId())
                .orElseThrow(() -> new RuntimeException("Queue not found or not active"));

        // 2. Get last token
        Integer lastToken = queueEntryRepository
                .findLastTokenNumber(queue.getId());

        int newToken = (lastToken == null) ? 1 : lastToken + 1;

        // 3. Get user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4. Save entry
        QueueEntry entry = QueueEntry.builder()
                .queue(queue)
                .user(user)
                .tokenNumber(newToken)
                .status("WAITING")
                .joinedAt(LocalDateTime.now())
                .build();

        queueEntryRepository.save(entry);

        // 5. Calculate position
        int position = newToken - queue.getCurrentToken();

        // 6. Estimate time
        int waitTime = position * queue.getService().getAvgServiceTime();

        return JoinQueueResponse.builder()
                .tokenNumber(newToken)
                .position(position)
                .estimatedWaitTime(waitTime)
                .build();
    }

    @Override
    public NextTokenResponse getNextToken(Integer queueId) {

        // 1. Check queue exists and active
        Queue queue = queueRepository
                .findByIdAndStatus(queueId, "ACTIVE")
                .orElseThrow(() -> new RuntimeException("Queue not found or not active"));

        // 2. Get last generated token
        Integer lastToken = queueEntryRepository.findLastTokenNumber(queue.getId());

        // 3. Calculate next token
        int nextToken = (lastToken == null) ? 1 : lastToken + 1;

        // 4. Return only preview
        return NextTokenResponse.builder()
                .nextToken(nextToken)
                .build();
    }

    @Override
    public QueuePositionResponse getQueuePosition(Integer queueId, Integer userId) {

        // 1. Check queue exists and active
        Queue queue = queueRepository
                .findActiveQueue(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found or not active"));

        // 2. Find user's queue entry
        QueueEntry entry = queueEntryRepository
                .findActiveQueueEntry(queueId, userId)
                .orElseThrow(() -> new RuntimeException("Queue entry not found for this user"));

        // 3. Calculate position
        int position = entry.getTokenNumber() - queue.getCurrentToken();

        // prevent negative values
        if (position < 0) {
            position = 0;
        }

        // 4. Estimate waiting time
        int waitTime = position * queue.getService().getAvgServiceTime();

        // 5. Build response
        return QueuePositionResponse.builder()
                .tokenNumber(entry.getTokenNumber())
                .position(position)
                .estimatedWaitTime(waitTime)
                .status(entry.getStatus())
                .build();
    }

    @Override
    @Transactional
    public SkipCustomerResponse skipCustomer(Integer queueId) {

        // 1. Lock active queue
        Queue queue = queueRepository
                .findActiveQueue(queueId)
                .orElseThrow(() -> new RuntimeException("Queue not found or not active"));

        Integer currentToken = queue.getCurrentToken();

        if (currentToken == null || currentToken == 0) {
            throw new RuntimeException("No active token to skip");
        }

        // 2. Find current waiting queue entry
        QueueEntry currentEntry = queueEntryRepository
                .findCurrentWaitingEntry(queueId, currentToken)
                .orElseThrow(() -> new RuntimeException("Current queue entry not found"));

        // 3. Mark current entry as skipped
        currentEntry.setStatus("SKIPPED");
        queueEntryRepository.save(currentEntry);

        // 4. Find next waiting token
        Optional<QueueEntry> nextEntryOptional = queueEntryRepository
                .findNextWaitingEntry(queueId, currentToken);

        Integer nextToken = null;

        if (nextEntryOptional.isPresent()) {
            QueueEntry nextEntry = nextEntryOptional.get();
            nextToken = nextEntry.getTokenNumber();
            queue.setCurrentToken(nextToken);
        } else {
            // No next customer, move current token forward by 1 OR keep same
            // Better to keep currentToken as skipped token if no one is waiting
            // OR set to currentToken + 1 if your business wants that
            queue.setCurrentToken(currentToken + 1);
        }

        queueRepository.save(queue);

        return SkipCustomerResponse.builder()
                .skippedToken(currentToken)
                .nextToken(nextToken)
                .queueStatus(queue.getStatus())
                .build();
    }

    @Override
    public DailyReportResponse getDailyReport(LocalDate date) {

        // if no date provided, use today
        if (date == null) {
            date = LocalDate.now();
        }

        Long total = queueEntryRepository.countTotalTokensByDate(date);
        Long served = queueEntryRepository.countServedTokensByDate(date);
        Long skipped = queueEntryRepository.countSkippedTokensByDate(date);
        Long waiting = queueEntryRepository.countWaitingTokensByDate(date);

        return DailyReportResponse.builder()
                .date(date.toString())
                .totalTokens(total != null ? total : 0)
                .servedTokens(served != null ? served : 0)
                .skippedTokens(skipped != null ? skipped : 0)
                .waitingTokens(waiting != null ? waiting : 0)
                .build();
    }
}