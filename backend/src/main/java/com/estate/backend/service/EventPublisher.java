package com.estate.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEvent;
import org.springframework.stereotype.Service;
import org.springframework.context.ApplicationEventPublisher;

@Service
public class EventPublisher {
    @Autowired
    ApplicationEventPublisher eventPublisher;

    public void publish(ApplicationEvent event) {
        eventPublisher.publishEvent(event);
    }

}
