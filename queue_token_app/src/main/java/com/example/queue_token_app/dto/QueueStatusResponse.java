package com.example.queue_token_app.dto;
public class QueueStatusResponse {
    private long queueId;
    private int currentToken;
    private int userToken;
    private int position;
    private int estimatedWaitTimeMinutes;
    private String status;

    // getters & setters
}