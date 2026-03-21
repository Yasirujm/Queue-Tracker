package com.example.queue_token_app.service;

import com.example.queue_token_app.dto.ActiveQueueResponse;
import com.example.queue_token_app.dto.ServiceQueueResponse;

import java.util.List;

public interface QueueService {
    public List<ServiceQueueResponse> getActiveQueues();
}