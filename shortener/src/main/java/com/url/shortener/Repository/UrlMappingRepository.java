package com.url.shortener.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.url.shortener.entity.UrlMapping;
import com.url.shortener.entity.User;

@Repository
public interface UrlMappingRepository extends MongoRepository<UrlMapping, String>{
    UrlMapping findByShortUrl(String shortUrl);
    UrlMapping findByUserAndOriginalUrl(User user,String originalUrl);
    List <UrlMapping> findByUser(User user);
}
