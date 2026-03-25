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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
}