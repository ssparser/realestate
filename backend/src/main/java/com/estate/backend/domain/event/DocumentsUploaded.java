package com.estate.backend.domain.event;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.context.ApplicationEvent;

public class DocumentsUploaded extends ApplicationEvent {
    private final MultipartFile[] documents;

    public DocumentsUploaded(Object source, MultipartFile[] documents) {
        super(source);
        this.documents = documents;
    }

    public MultipartFile[] getDocuments() {
        return documents;
    }
}
