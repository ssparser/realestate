package com.estate.backend.service;

import org.springframework.stereotype.Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.io.InputStream;

@Service
public class AWSService {

    Logger LOG = LogManager.getLogger(AWSService.class);

    @Autowired
    AmazonS3 amazonS3;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

     public void putObjectIntoBucket( String objName, InputStream inputStream) {
        amazonS3.putObject(new PutObjectRequest(bucketName, objName, inputStream, null));
    }
}
