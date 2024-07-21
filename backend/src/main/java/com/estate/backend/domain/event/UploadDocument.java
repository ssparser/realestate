package com.estate.backend.domain.event;

import org.springframework.context.ApplicationEvent;
import org.springframework.web.multipart.MultipartFile;

public class UploadDocument extends ApplicationEvent {
    private final MultipartFile document;

    public UploadDocument(Object source, MultipartFile document) {
        super(source);
        this.document = document;
    }

    public MultipartFile getDocument() {
        return document;
    }
}