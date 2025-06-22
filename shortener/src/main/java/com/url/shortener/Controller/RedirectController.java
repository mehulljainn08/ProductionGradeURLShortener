package com.url.shortener.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.Repository.ClickEventRepository;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.entity.ClickEvent;
import com.url.shortener.entity.UrlMapping;

@RestController
@RequestMapping("/{shortUrl}")
public class RedirectController {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    @Autowired
    private ClickEventRepository clickEventRepository;
    @GetMapping
    public ResponseEntity<?> redirect(@PathVariable String shortUrl) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);

        if (urlMapping == null) {
            return ResponseEntity.badRequest().body("No mapping found");
        }

        try {
            String originalUrl = urlMapping.getOriginalUrl();
    
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location", originalUrl);
            ClickEvent clickEvent = new ClickEvent();
            urlMapping.setClickCount(urlMapping.getClickCount()+1);
            urlMappingRepository.save(urlMapping);
            clickEvent.setUrlMapping(urlMapping);
            clickEvent.setTimestamp(LocalDateTime.now());
            clickEventRepository.save(clickEvent);
            return ResponseEntity.status(302).headers(httpHeaders).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
