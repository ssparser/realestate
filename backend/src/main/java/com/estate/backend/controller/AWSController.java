package com.estate.backend.controller;

import com.estate.backend.service.AWSService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/files")
public class AWSController {

    @Autowired
    AWSService awsService;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @PostMapping("/uploadObj")
    public String uploadObject(
            @RequestParam("objName") String objName,
            @RequestParam("file") MultipartFile file) throws IOException {
        
        awsService.putObjectIntoBucket(objName, file.getInputStream());
        return "File uploaded successfully";
    }
}
