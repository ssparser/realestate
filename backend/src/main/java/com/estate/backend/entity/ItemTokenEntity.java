package com.estate.backend.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.Date;

import org.springframework.data.annotation.Id;

@DynamoDBTable(tableName = "realestate-token-db")
public class ItemTokenEntity {

    @Id
    private Long id;
    private String token;
    private Long toExpire;
    @DynamoDBAttribute(attributeName = "folderName")
    private String folderName;

    @DynamoDBHashKey(attributeName = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName = "token")
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @DynamoDBAttribute(attributeName = "toExpire")
    public Long getToExpire()
    {
        return toExpire;
    }

    public void setToExpire(Long date) {
        this.toExpire = date;
    }

    public String getFolderName()
    {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

}