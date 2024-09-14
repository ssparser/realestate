package com.estate.backend.service;

import java.util.Date;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estate.backend.entity.ItemTokenEntity;
import com.estate.backend.repository.ItemTokenRepository;


@Service
public class TokenService {
    @Autowired
    private ItemTokenRepository itemTokenRepository;

    private Map<String, String> tokenToFolderMap = new ConcurrentHashMap<>();

    public String generateToken(String folderName, Long TTL) {
        ItemTokenEntity item = new ItemTokenEntity();
        Random rand = new Random();

        item.setId(rand.nextLong(1000));
        String token = UUID.randomUUID().toString();
        item.setToken(token);
        item.setFolderName(folderName);
        System.out.println(TTL);
        // Calendar calendar = Calendar.getInstance();

        // calendar.add(Calendar.MINUTE, 1);

        // long ttlInSeconds = calendar.getTimeInMillis() / 1000;

        item.setToExpire(TTL);
    
        itemTokenRepository.save(item);
        return token;
    }

    public ItemTokenEntity validateToken(String token) {
        return itemTokenRepository.findByToken(token);
    }



    // public ItemTokenEntity saveItemToken(ItemTokenEntity itemToken) {
    //     return itemTokenRepository.save(itemToken);
    // }
 }