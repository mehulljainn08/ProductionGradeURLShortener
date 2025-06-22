package com.url.shortener.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.url.shortener.entity.ClickEvent;
import com.url.shortener.entity.UrlMapping;

public interface ClickEventRepository extends MongoRepository<ClickEvent, String> {
    List<ClickEvent> findByUrlMappingAndTimestampBetween(
    UrlMapping urlMapping,
    LocalDateTime startDate,
    LocalDateTime endDate);

    List<ClickEvent> findByUrlMappingInAndTimestampBetween(
        List<UrlMapping> urlMappings,
        LocalDateTime startDate,
        LocalDateTime endDate
    );

}
