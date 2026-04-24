package com.example.queue_token_app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QueueData {

    private Long queueId;
    private Integer currentToken;
    private String queueStatus;
}