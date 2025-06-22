package com.url.shortener.DTO;

import java.time.LocalDateTime;

import com.url.shortener.entity.UrlMapping;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UrlMappingDTO {
    private String originalUrl;
    private String shortUrl;
    private String userName;
    private String id;
    private Long ClickCount;
    private LocalDateTime createdAt;
    public UrlMappingDTO(UrlMapping urlMapping) {
        this.originalUrl = urlMapping.getOriginalUrl();
        this.shortUrl = urlMapping.getShortUrl();
        this.userName = urlMapping.getUser().getUserName();
        this.id = urlMapping.getId();
        this.ClickCount = urlMapping.getClickCount();
        this.createdAt = urlMapping.getCreatedDatetime();
    }
}
