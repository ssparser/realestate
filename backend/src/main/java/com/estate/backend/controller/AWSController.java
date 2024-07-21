package com.estate.backend.controller;

import com.estate.backend.domain.event.DocumentsUploaded;
import com.estate.backend.service.AWSService;
import com.estate.backend.service.EventPublisher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/files")
public class AWSController {

    @Autowired
    AWSService awsService;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Autowired
    EventPublisher eventPublisher;

 

    @PostMapping(value = "/upload", consumes = "multipart/form-data", produces = {"application/json"})
    public ResponseEntity<String> upload(@RequestParam(name = "files") MultipartFile[] files) {
          if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body("No files uploaded.");
        }

        try {
            eventPublisher.publish(new DocumentsUploaded(this, files));
            return ResponseEntity.ok("Files uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: " + e.getMessage());
        }
    }
}
