package com.estate.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;

@Service
public class AWSService {


    @Autowired
    AmazonS3 amazonS3;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;


    ArrayList<String> imageExtensions = new ArrayList<>(Arrays.asList("jpg","jpeg","png","gif","bmp","tiff","webp","svg"));

    String propertyName = "";
    String itemName = "";

    public void fileNames(String propertyName, String itemName)
    {
        this.propertyName = propertyName;
        this.itemName = itemName;
    }

    public void upload(MultipartFile document) throws IOException {
        String objectName = getFileName(document);
        uploadToS3(objectName, document);
    }

    private void uploadToS3(String fileName, MultipartFile multipartFile) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, multipartFile.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.BucketOwnerFullControl));
    }


    private String getFileName(MultipartFile document) {
        if(itemName.isEmpty())
        {
            return propertyName + "/" + document.getOriginalFilename().replace(" ", "_");
        }
        return  propertyName + "/" + itemName + "/" + document.getOriginalFilename().replace(" ", "_");
    }

}
