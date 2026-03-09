package com.example.queue_token_app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "customer_id", columnDefinition = "uuid")
    private UUID customerId;

    @Column(name = "business_name", nullable = false, columnDefinition = "text")
    private String businessName;

    @Column(name = "email", unique = true, columnDefinition = "text")
    private String email;

    @Column(name = "phone_no", columnDefinition = "text")
    private String phoneNo;

    @Column(name = "address", columnDefinition = "text")
    private String address;

    @Column(name = "location_url", columnDefinition = "text")
    private String locationUrl;

    @Column(name = "join_date", nullable = false, updatable = false)
    private LocalDateTime joinDate;

    @PrePersist
    protected void onCreate() {
        if (joinDate == null) {
            joinDate = LocalDateTime.now();
        }
    }
}
