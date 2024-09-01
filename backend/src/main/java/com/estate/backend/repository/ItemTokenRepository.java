package com.estate.backend.repository;


import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.estate.backend.entity.ItemTokenEntity;

@EnableScan
public interface ItemTokenRepository extends CrudRepository<ItemTokenEntity, Long> {
}
