package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.Queue;
import com.example.queue_token_app.dto.ActiveQueueResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QueueRepository extends JpaRepository<Queue, Long> {

    @Query("""
        SELECT new com.example.queue_token_app.dto.ActiveQueueResponse(
            q.id,
            q.currentToken,
            q.status,
            s.id,
            s.name,
            s.location,
            s.avgServiceTime
        )
        FROM Queue q
        JOIN Service s ON q.service.id = s.id
        WHERE q.status = 'ACTIVE'
    """)
    List<ActiveQueueResponse> findActiveQueues();
}