package com.estate.backend.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ListObjectsV2Request;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.S3ObjectSummary;

@Service
public class AWSS3RetrievalService {

        @Autowired
        AmazonS3 amazonS3;

        @Value("${aws.s3.bucket.name}")
        private String bucketName;

        private static final List<String> IMAGE_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", ".bmp",
                        ".tiff", ".webp", ".svg", ".avif");

        public Page<String> listFolders(String prefix, Pageable pageable) {
                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withPrefix(prefix)
                                .withDelimiter("/");

                return getPagedResult(req, pageable);
        }

        public Page<String> listFoldersNoPrefix(Pageable pageable) {
                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withDelimiter("/");

                return getPagedResult(req, pageable);
        }

        public List<String> listFoldersNoPagination(String prefix) {

                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withPrefix(prefix)
                                .withDelimiter("/");
                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getCommonPrefixes();
        }

        public List<String> listFoldersNoPreifxNoPagination() {

                ListObjectsV2Request req = new ListObjectsV2Request()
                                .withBucketName(bucketName)
                                .withDelimiter("/");
                ListObjectsV2Result result = amazonS3.listObjectsV2(req);

                return result.getCommonPrefixes();
        }

        private Page<String> getPagedResult(ListObjectsV2Request req, Pageable pageable) {
                List<String> allPrefixes = new ArrayList<>();
                ListObjectsV2Result result;

                do {
                        result = amazonS3.listObjectsV2(req);
                        allPrefixes.addAll(result.getCommonPrefixes());
                        req.setContinuationToken(result.getNextContinuationToken());
                } while (result.isTruncated());

                int start = (int) pageable.getOffset();
                int end = Math.min((start + pageable.getPageSize()), allPrefixes.size());

                // Ensure start is not beyond the list size
                start = Math.min(start, allPrefixes.size());

                // Ensure end is not less than start
                end = Math.max(end, start);

                List<String> pageContent = allPrefixes.subList(start, end);
                return new PageImpl<>(pageContent, pageable, allPrefixes.size());
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
                                .filter(s3Object -> isImageFile(s3Object.getKey()))
                                .map(s3Object -> generateS3ObjectUrl(s3Object.getKey()))
                                .collect(Collectors.toList());
        }

        private String generateS3ObjectUrl(String objectKey) {
                String fixedObjectKey = objectKey.replace(" ", "+");
                return String.format("https://%s.s3.amazonaws.com/%s", bucketName, fixedObjectKey);
        }

        private boolean isImageFile(String key) {
                return IMAGE_EXTENSIONS.stream().anyMatch(key.toLowerCase()::endsWith);
        }

}
