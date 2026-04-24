package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {

    @Query("SELECT MAX(qe.tokenNumber) FROM QueueEntry qe WHERE qe.queue.id = :queueId")
    Integer findLastTokenNumber(Long queueId);

    @Query("""
        SELECT qe
        FROM QueueEntry qe
        WHERE qe.queue.id = :queueId
          AND qe.user.id = :userId
          AND qe.status IN ('WAITING', 'CALLED')
        ORDER BY qe.joinedAt DESC
    """)
    Optional<QueueEntry> findActiveQueueEntry(Integer queueId, Integer userId);

//    @Query("""
//        SELECT MAX(qe.tokenNumber)
//        FROM QueueEntry qe
//        WHERE qe.queue.id = :queueId
//    """)
//    Integer findLastTokenNumber(Integer queueId);

    @Query("""
        SELECT qe
        FROM QueueEntry qe
        WHERE qe.queue.id = :queueId
          AND qe.tokenNumber = :currentToken
          AND qe.status = 'WAITING'
    """)
    Optional<QueueEntry> findCurrentWaitingEntry(Integer queueId, Integer currentToken);

    @Query("""
        SELECT qe
        FROM QueueEntry qe
        WHERE qe.queue.id = :queueId
          AND qe.tokenNumber > :currentToken
          AND qe.status = 'WAITING'
        ORDER BY qe.tokenNumber ASC
    """)
    Optional<QueueEntry> findNextWaitingEntry(Integer queueId, Integer currentToken);

    @Query("""
    SELECT COUNT(qe)
    FROM QueueEntry qe
    WHERE DATE(qe.joinedAt) = :date
    """)
    Long countTotalTokensByDate(LocalDate date);

    @Query("""
    SELECT COUNT(qe)
    FROM QueueEntry qe
    WHERE DATE(qe.joinedAt) = :date
      AND qe.status = 'SERVED'
    """)
    Long countServedTokensByDate(LocalDate date);

    @Query("""
    SELECT COUNT(qe)
    FROM QueueEntry qe
    WHERE DATE(qe.joinedAt) = :date
      AND qe.status = 'SKIPPED'
    """)
    Long countSkippedTokensByDate(LocalDate date);

    @Query("""
    SELECT COUNT(qe)
    FROM QueueEntry qe
    WHERE DATE(qe.joinedAt) = :date
      AND qe.status = 'WAITING'
    """)
    Long countWaitingTokensByDate(LocalDate date);
}