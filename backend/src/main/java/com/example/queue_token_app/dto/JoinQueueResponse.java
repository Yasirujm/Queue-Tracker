package com.example.queue_token_app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JoinQueueResponse {

    private Integer tokenNumber;
    private Integer position;
    private Integer estimatedWaitTime;
}