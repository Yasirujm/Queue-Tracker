package com.example.queue_token_app.service;

import com.example.queue_token_app.dto.*;

import java.util.List;

public interface QueueService {
    public List<ServiceQueueResponse> getActiveQueues();

    public JoinQueueResponse joinQueue(JoinQueueRequest request);

    NextTokenResponse getNextToken(Integer queueId);
}