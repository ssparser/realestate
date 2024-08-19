package com.estate.backend.service;

import java.net.URL;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;

@Service
public class AWSS3RetrievalService {

        @Autowired
        AmazonS3 amazonS3;

        @Value("${aws.s3.bucket.name}")
        private String bucketName;

        public List<String> listFolders(String prefix) {

                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withPrefix(prefix)
                                .withDelimiter("/");
                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getCommonPrefixes();
        }

        public List<String> listFoldersNoPreifx() {

                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withDelimiter("/");
                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getCommonPrefixes();
        }

        public List<String> listFiles(String prefix) {
                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withPrefix(prefix)
                                .withDelimiter("/");
                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getObjectSummaries().stream()
                                .map(S3ObjectSummary::getKey)
                                .collect(Collectors.toList());
        }

        public List<String> getObjectUrls(String prefix) {
                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withPrefix(prefix)
                                .withDelimiter("/");

                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getObjectSummaries().stream()
                                .map(s3Object -> generateS3ObjectUrl(s3Object.getKey()))
                                .collect(Collectors.toList());
        }

        private String generateS3ObjectUrl(String objectKey) {
                String fixedObjectKey = objectKey.replace(" ", "+");
                return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fixedObjectKey);
        }



}
