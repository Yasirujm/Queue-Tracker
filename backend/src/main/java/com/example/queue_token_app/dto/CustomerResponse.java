package com.example.queue_token_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private UUID customerId;
    private String businessName;
    private String email;
    private String phoneNo;
    private String address;
    private String locationUrl;
    private LocalDateTime joinDate;
}
