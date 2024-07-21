package com.estate.backend.domain.listener;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.estate.backend.domain.event.UploadDocument;
import com.estate.backend.service.AWSService;

@Component
public class UploadDocumentListener implements ApplicationListener<UploadDocument> {

    @Autowired
    AWSService awsService;

    

    @Override
    public void onApplicationEvent(UploadDocument event)
    {
        try {
            awsService.upload(event.getDocument());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}