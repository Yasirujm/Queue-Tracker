package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {

    @Query("SELECT COALESCE(MAX(q.tokenNumber), 0) FROM QueueEntry q WHERE q.queueId = :queueId")
    Integer findMaxTokenNumberByQueueId(@Param("queueId") Long queueId);
}