package com.example.queue_token_app.repository;

import com.example.queue_token_app.entity.QueueEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Queue;

@Repository
public interface QueueEntryRepository extends JpaRepository<QueueEntry, Long> {

    @Query("SELECT COALESCE(MAX(q.tokenNumber), 0) FROM QueueEntry q WHERE q.queueId = :queueId")
    Integer findMaxTokenNumberByQueueId(@Param("queueId") Long queueId);

    @Repository
    public interface QueueRepository extends JpaRepository<Queue, Long> {}

    @Repository
    public interface ServiceRepository extends JpaRepository<Service, Long> {}

    
}