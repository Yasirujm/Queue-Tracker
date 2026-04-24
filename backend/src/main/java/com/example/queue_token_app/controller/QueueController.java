package com.example.queue_token_app.controller;

import com.example.queue_token_app.dto.*;
import com.example.queue_token_app.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/{queueId}/position/{userId}")
    public ResponseEntity<ApiResponse<QueuePositionResponse>> getQueuePosition(
            @PathVariable Integer queueId,
            @PathVariable Integer userId) {

        QueuePositionResponse response = queueService.getQueuePosition(queueId, userId);

        return ResponseEntity.ok(
                ApiResponse.success("Queue position retrieved successfully", response)
        );
    }

    @PutMapping("/{queueId}/skip")
    public ResponseEntity<ApiResponse<SkipCustomerResponse>> skipCustomer(@PathVariable Integer queueId) {
        SkipCustomerResponse response = queueService.skipCustomer(queueId);

        return ResponseEntity.ok(
                ApiResponse.success("Customer skipped successfully", response)
        );
    }

    @GetMapping("/reports/daily")
    public ResponseEntity<ApiResponse<DailyReportResponse>> getDailyReport(
            @RequestParam(required = false) String date) {

        LocalDate reportDate = (date != null) ? LocalDate.parse(date) : null;

        DailyReportResponse response = queueService.getDailyReport(reportDate);

        return ResponseEntity.ok(
                ApiResponse.success("Daily report fetched successfully", response)
        );
    }
}