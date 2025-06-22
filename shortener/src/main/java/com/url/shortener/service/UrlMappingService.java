package com.url.shortener.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.url.shortener.DTO.ClickEventDTO;
import com.url.shortener.DTO.UrlMappingDTO;
import com.url.shortener.Repository.ClickEventRepository;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.entity.ClickEvent;
import com.url.shortener.entity.UrlMapping;
import com.url.shortener.entity.User;

@Service
public class UrlMappingService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    @Autowired
    private ClickEventRepository clickEventRepository;

   
    public UrlMappingDTO shortenUrl(String longUrl, User user) {
        if(urlMappingRepository.findByUserAndOriginalUrl(user,longUrl)!=null){
            UrlMapping existingMapping=urlMappingRepository.findByUserAndOriginalUrl(user,longUrl);
            return new UrlMappingDTO(
                existingMapping.getOriginalUrl(),
                existingMapping.getShortUrl(),
                user.getUserName(),
                existingMapping.getId(),
                existingMapping.getClickCount(),
                existingMapping.getCreatedDatetime()
            );
        }

        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();

        urlMapping.setOriginalUrl(longUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDatetime(LocalDateTime.now());

        
        urlMapping.setExpirationTime(LocalDateTime.now().plusDays(10));

        urlMappingRepository.save(urlMapping);
        
        return new UrlMappingDTO(
            urlMapping.getOriginalUrl(),
            urlMapping.getShortUrl(),
            user.getUserName(),
            urlMapping.getId(),
            urlMapping.getClickCount(),
            urlMapping.getCreatedDatetime()
        );
}


   
    private String generateShortUrl() {
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

   
    public List<ClickEventDTO> getClickEvents(String shortUrl, LocalDateTime startDate, LocalDateTime endDate) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping == null) {
            throw new RuntimeException("UrlMapping not found for shortUrl: " + shortUrl);
        }

        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingAndTimestampBetween(
            urlMapping, startDate, endDate
        );

        Map<LocalDate, Long> grouped = clickEvents.stream()
            .collect(Collectors.groupingBy(
                event -> event.getTimestamp().toLocalDate(),
                Collectors.counting()
        ));

        return grouped.entrySet().stream()
            .map(entry -> {
                ClickEventDTO dto = new ClickEventDTO();
                dto.setClickDate(entry.getKey());
                dto.setClickCount(entry.getValue());
                return dto;
            })
            .toList();
    }

   
    public List<ClickEventDTO> totalClickEventsOfUser(User user, LocalDateTime startDate, LocalDateTime endDate) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        if (urlMappings.isEmpty()) {
            throw new RuntimeException("No UrlMappings found for user: " + user.getUserName());
        }

        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndTimestampBetween(
            urlMappings, startDate, endDate
        );

        Map<String, Map<LocalDate, Long>> grouped = clickEvents.stream()
            .collect(Collectors.groupingBy(
                ce -> ce.getUrlMapping().getShortUrl(),
                Collectors.groupingBy(
                    ce -> ce.getTimestamp().toLocalDate(),
                    Collectors.counting()
                )
            ));

        return grouped.entrySet().stream()
            .flatMap(shortUrlEntry -> {
                String shortUrl = shortUrlEntry.getKey();
                return shortUrlEntry.getValue().entrySet().stream()
                    .map(dateEntry -> {
                        ClickEventDTO dto = new ClickEventDTO();
                        dto.setShortUrl(shortUrl);
                        dto.setClickDate(dateEntry.getKey());
                        dto.setClickCount(dateEntry.getValue());
                        return dto;
                    });
            })
            .toList();
    }
}

