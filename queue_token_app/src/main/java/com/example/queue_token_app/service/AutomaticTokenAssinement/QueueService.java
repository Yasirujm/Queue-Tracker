package com.example.queue_token_app.service.AutomaticTokenAssinement;

import com.example.queue_token_app.entity.QueueEntry;
import com.example.queue_token_app.repository.QueueEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QueueService {

    @Autowired
    private QueueEntryRepository queueEntryRepository;

    @Transactional
    public QueueEntry joinQueue(Long queueId, Long userId) {
        // Get next token number
        Integer nextToken = queueEntryRepository.findMaxTokenNumberByQueueId(queueId) + 1;

        // Create new queue entry
        QueueEntry entry = new QueueEntry();
        entry.setQueueId(queueId);
        entry.setUserId(userId);
        entry.setTokenNumber(nextToken);
        entry.setStatus("WAITING");

        return queueEntryRepository.save(entry);
    }
}