package com.example.queue_token_app.service;

import com.example.queue_token_app.dto.*;

import java.util.List;
import java.time.LocalDate;

public interface QueueService {
    public List<ServiceQueueResponse> getActiveQueues();

    public JoinQueueResponse joinQueue(JoinQueueRequest request);

    NextTokenResponse getNextToken(Integer queueId);

    public QueuePositionResponse getQueuePosition(Integer queueId, Integer userId);

    public SkipCustomerResponse skipCustomer(Integer queueId);

    DailyReportResponse getDailyReport(LocalDate date);
}