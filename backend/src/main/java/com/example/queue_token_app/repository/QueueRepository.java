package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.Queue;
import com.example.queue_token_app.dto.ActiveQueueResponse;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

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

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT q FROM Queue q WHERE q.id = :queueId AND q.status = 'ACTIVE'")
    Optional<Queue> findActiveQueueForUpdate(Long queueId);

    @Query("SELECT MAX(qe.tokenNumber) FROM QueueEntry qe WHERE qe.queue.id = :queueId")
    Integer findLastTokenNumber(Long queueId);

    Optional<Queue> findByIdAndStatus(Integer id, String status);
}