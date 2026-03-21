package com.example.queue_token_app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    @Column(name = "avg_service_time")
    private Integer avgServiceTime;

    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // 🔗 One Service → Many Queues
    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<Queue> queues;
}