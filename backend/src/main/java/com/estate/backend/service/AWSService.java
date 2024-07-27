package com.estate.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.File;

@Service
public class AWSService {


    @Autowired
    AmazonS3 amazonS3;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    String propertyName = "";
    String itemName = "";

    public void fileNames(String propertyName, String itemName)
    {
        this.propertyName = propertyName;
        this.itemName = itemName;
    }

    public void upload(MultipartFile document) throws IOException {

        File file = convertToFile(document);
        String Objectname = getFileName(document);

        uploadToS3(Objectname, file);

    }

    private void uploadToS3(String fileName, File file) {
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.BucketOwnerFullControl));
    }

    private String getFileName(MultipartFile document) {
        return  propertyName + "/" + itemName + "/" + document.getOriginalFilename().replace(" ", "_");
    }

    private File convertToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(multipartFile.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(multipartFile.getBytes());
        fos.close();
        return file;
    }
}
