package com.example.queue_token_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyReportResponse {
    private String date;
    private Long totalTokens;
    private Long servedTokens;
    private Long skippedTokens;
    private Long waitingTokens;
}