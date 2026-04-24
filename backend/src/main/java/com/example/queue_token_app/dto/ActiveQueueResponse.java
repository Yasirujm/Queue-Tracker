package com.example.queue_token_app.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ActiveQueueResponse {

    private Long queueId;
    private Integer currentToken;
    private String queueStatus;

    private Long serviceId;
    private String serviceName;
    private String location;
    private Integer avgServiceTime;
}