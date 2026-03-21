package com.example.queue_token_app.controller;

import com.example.queue_token_app.dto.ApiResponse;
import com.example.queue_token_app.dto.ActiveQueueResponse;
import com.example.queue_token_app.dto.ServiceQueueResponse;
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
}