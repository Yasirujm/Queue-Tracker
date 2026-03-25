package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {

    @Query("SELECT MAX(qe.tokenNumber) FROM QueueEntry qe WHERE qe.queue.id = :queueId")
    Integer findLastTokenNumber(Long queueId);
}