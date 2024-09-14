package com.estate.backend.controller;

import java.util.Date;
import java.util.HashMap;
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

import com.estate.backend.entity.ItemTokenEntity;
import com.estate.backend.service.TokenService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/share")
public class ShareController {

    @Autowired
    private TokenService tokenService;


    @PostMapping("/generate")
    public ResponseEntity<String> generateShareLink(@RequestParam Long TTL, @RequestParam String folderName) {
        String token = tokenService.generateToken(folderName, TTL);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/validate/{token}")
    public ResponseEntity<Map<String, Object>> validateShareLink(@PathVariable String token) {
        ItemTokenEntity item = tokenService.validateToken(token);
        if (item.getFolderName() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        

        
        Map<String, Object> response = new HashMap<>();
        response.put("folderName", item.getFolderName());
        
        return ResponseEntity.ok(response);
    }



}
