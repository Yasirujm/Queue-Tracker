package com.example.queue_token_app.controller;

import com.example.queue_token_app.entity.QueueEntry;

import com.example.queue_token_app.service.AutomaticTokenAssinement.QueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/queues")
public class QueueController {

    @Autowired
    private QueueService queueService;

    @PostMapping("/{queueId}/join")
    public ResponseEntity<QueueEntry> joinQueue(
            @PathVariable Long queueId,
            @RequestParam Long userId) {
        QueueEntry entry = queueService.joinQueue(queueId, userId);
        return ResponseEntity.ok(entry);
    }
}