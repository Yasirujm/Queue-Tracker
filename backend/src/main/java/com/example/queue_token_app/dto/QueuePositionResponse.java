package com.example.queue_token_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueuePositionResponse {
    private Integer tokenNumber;
    private Integer position;
    private Integer estimatedWaitTime;
    private String status;
}