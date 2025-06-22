package com.url.shortener.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "click_events")
@Data
@NoArgsConstructor
public class ClickEvent {

    @Id
    private String clickId;

    private LocalDateTime timestamp;
    
    @DBRef
    @NonNull
    private UrlMapping urlMapping;
    
}
