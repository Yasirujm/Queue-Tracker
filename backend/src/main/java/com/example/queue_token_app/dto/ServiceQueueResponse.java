package com.example.queue_token_app.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ServiceQueueResponse {

    private Long serviceId;
    private String serviceName;
    private String location;
    private Integer avgServiceTime;

    private List<QueueData> queues;
}