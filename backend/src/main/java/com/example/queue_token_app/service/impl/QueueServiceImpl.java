package com.example.queue_token_app.service.impl;

import com.example.queue_token_app.dto.ActiveQueueResponse;
import com.example.queue_token_app.dto.QueueData;
import com.example.queue_token_app.dto.ServiceQueueResponse;
import com.example.queue_token_app.repository.QueueRepository;
import com.example.queue_token_app.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QueueServiceImpl implements QueueService {

    private final QueueRepository queueRepository;

    @Override
    public List<ServiceQueueResponse> getActiveQueues() {

        List<ActiveQueueResponse> flatList = queueRepository.findActiveQueues();

        Map<Long, ServiceQueueResponse> grouped = new LinkedHashMap<>();

        for (ActiveQueueResponse item : flatList) {

            // If service not exists → create it
            grouped.computeIfAbsent(item.getServiceId(), id ->
                    ServiceQueueResponse.builder()
                            .serviceId(item.getServiceId())
                            .serviceName(item.getServiceName())
                            .location(item.getLocation())
                            .avgServiceTime(item.getAvgServiceTime())
                            .queues(new ArrayList<>())
                            .build()
            );

            // Add queue under service
            grouped.get(item.getServiceId()).getQueues().add(
                    QueueData.builder()
                            .queueId(item.getQueueId())
                            .currentToken(item.getCurrentToken())
                            .queueStatus(item.getQueueStatus())
                            .build()
            );
        }

        return new ArrayList<>(grouped.values());
    }
}