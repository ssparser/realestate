package com.estate.backend.domain.listener;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.estate.backend.domain.event.DocumentsUploaded;
import com.estate.backend.domain.event.UploadDocument;
import com.estate.backend.service.EventPublisher;


@Component
public class DocumentsUploadedListener implements ApplicationListener<DocumentsUploaded> {

    @Autowired
    EventPublisher eventPublisher;
   
    @Override
    public void onApplicationEvent(DocumentsUploaded event) {
        Arrays.stream(event.getDocuments()).forEach(document -> eventPublisher.publish(new UploadDocument(this,
                document)));
    }
}