package com.estate.backend.controller;

import com.estate.backend.domain.event.DocumentsUploaded;
import com.estate.backend.service.AWSS3RetrievalService;
import com.estate.backend.service.AWSService;
import com.estate.backend.service.EventPublisher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/files")
public class AWSController {

    @Autowired
    AWSService awsService;



    @Autowired
    AWSS3RetrievalService awss3RetrievalService;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Autowired
    EventPublisher eventPublisher;

    @PostMapping(value = "/upload", consumes = "multipart/form-data", produces = { "application/json" })
    public ResponseEntity<String> upload(@RequestParam(name = "files") MultipartFile[] files,
            @RequestParam(name = "propertyName") String propertyName,
            @RequestParam(name = "itemName") String itemName) {
        if (files == null || files.length == 0) {
            return ResponseEntity.badRequest().body("No files uploaded.");
        }

        try {
            awsService.fileNames(propertyName, itemName);
            eventPublisher.publish(new DocumentsUploaded(this, files));
            return ResponseEntity.ok("Files uploaded successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/folders")
    public List<String> listFolders(@RequestParam String prefix) {
        if(prefix == "")
        {
            return awss3RetrievalService.listFoldersNoPreifx();
        }
        return awss3RetrievalService.listFolders(prefix);
    }

    @GetMapping("/files")
    public List<String> listFiles(@RequestParam String prefix) {
        return awss3RetrievalService.listFiles(prefix);
    }

    @GetMapping("/image")
    public List<String> getImage(@RequestParam String prefix) {
        return awss3RetrievalService.getObjectUrls(prefix);
    }



    
}
