package com.url.shortener.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "url_mappings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlMapping {
    @Id
    private String id;

    private String originalUrl;
    private String shortUrl;
    private long clickCount = 0;
    private LocalDateTime createdDatetime;
    @Indexed(name = "expiry_index", expireAfterSeconds = 0)
    private LocalDateTime expirationTime;

    @DBRef
    private User user;

    
    
}

