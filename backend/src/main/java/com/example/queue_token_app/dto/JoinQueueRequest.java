package com.example.queue_token_app.dto;

import lombok.Data;

@Data
public class JoinQueueRequest {
    private Long userId;
    private Long queueId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getQueueId() {
        return queueId;
    }

    public void setQueueId(Long queueId) {
        this.queueId = queueId;
    }
}