package com.example.queue_token_app.controller;

import com.example.queue_token_app.dto.*;
import com.example.queue_token_app.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/queues")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QueueController {

    private final QueueService queueService;

    @GetMapping("/active")
    public ResponseEntity<ApiResponse<List<ServiceQueueResponse>>> getActiveQueues() {

        List<ServiceQueueResponse> queues = queueService.getActiveQueues();

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Active queues fetched successfully",
                        queues
                )
        );
    }

    @PostMapping("/join")
    public ResponseEntity<ApiResponse<JoinQueueResponse>> joinQueue(
            @RequestBody JoinQueueRequest request) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Token generated successfully",
                        queueService.joinQueue(request)
                )
        );
    }

    @GetMapping("/{queueId}/next-token")
    public ResponseEntity<ApiResponse<NextTokenResponse>> getNextToken(@PathVariable Integer queueId) {
        NextTokenResponse response = queueService.getNextToken(queueId);

        return ResponseEntity.ok(
                ApiResponse.<NextTokenResponse>builder()
                        .success(true)
                        .message("Next token fetched successfully")
                        .data(response)
                        .build()
        );
    }
}