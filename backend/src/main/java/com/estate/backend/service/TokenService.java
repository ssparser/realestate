package com.estate.backend.service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estate.backend.entity.ItemTokenEntity;
import com.estate.backend.repository.ItemTokenRepository;

@Service
public class TokenService {
    private Map<String, String> tokenToFolderMap = new ConcurrentHashMap<>();

    public String generateToken(String folderName) {
        String token = UUID.randomUUID().toString();
        tokenToFolderMap.put(token, folderName);
        return token;
    }

    public String validateToken(String token) {
        return tokenToFolderMap.get(token);
    }

    // @Autowired
    // private ItemTokenRepository itemTokenRepository;

    // public ItemTokenEntity saveItemToken(ItemTokenEntity itemToken) {
    //     return itemTokenRepository.save(itemToken);
    // }
 }