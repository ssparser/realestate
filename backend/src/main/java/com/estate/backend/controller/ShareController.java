package com.estate.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.estate.backend.service.AWSS3RetrievalService;
import com.estate.backend.service.TokenService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/share")
public class ShareController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AWSS3RetrievalService awsS3RetrievalService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateShareLink(@RequestParam String folderName) {
        String token = tokenService.generateToken(folderName);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<Map<String, Object>> validateShareLink(@PathVariable String token) {
        String folderName = tokenService.validateToken(token);
        if (folderName == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<String> files = awsS3RetrievalService.listFiles(folderName);
        List<String> objectUrls = awsS3RetrievalService.getObjectUrls(folderName);
        
        Map<String, Object> response = new HashMap<>();
        response.put("folderName", folderName);
        response.put("files", files);
        response.put("objectUrls", objectUrls);
        
        return ResponseEntity.ok(response);
    }
}
