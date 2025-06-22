package com.url.shortener.Controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.DTO.ClickEventDTO;
import com.url.shortener.DTO.UrlMappingDTO;
import com.url.shortener.Repository.UrlMappingRepository;
import com.url.shortener.Repository.UserRepository;
import com.url.shortener.entity.UrlMapping;
import com.url.shortener.entity.User;
import com.url.shortener.service.UrlMappingService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
@NoArgsConstructor
public class UrlMappingController {

    
    @Autowired
    private UrlMappingService urlMappingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    
   
    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody Map<String, String> requestBody,Principal principal) {
        String originalUrl = requestBody.get("originalUrl");
        User user=userRepository.findByUserName(principal.getName());
        UrlMappingDTO urlMappingDTO=urlMappingService.shortenUrl(originalUrl, user);
        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/userMappings")
    public ResponseEntity<?> getUserMappings(Principal principal) {
        String username = principal.getName();
        User user = userRepository.findByUserName(username);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        List<UrlMapping> userMappings = urlMappingRepository.findByUser(user);
        List<UrlMappingDTO> urlMappingDTOs=userMappings.stream().map((urlMapping)->new UrlMappingDTO(urlMapping)).toList();
        return ResponseEntity.ok(urlMappingDTOs);
    }

    @GetMapping("/analytics/{shortUrl}")
    public ResponseEntity<?> getUrlAnalytics (@PathVariable String shortUrl,@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
        UrlMapping urlMapping= urlMappingRepository.findByShortUrl(shortUrl);
        
        if (urlMapping == null) {
            return ResponseEntity.status(404).body("Short URL not found");
        }
        try {
            List<ClickEventDTO> clickEventDTOs= urlMappingService.getClickEvents(
                shortUrl,
                LocalDateTime.parse(startDate, DateTimeFormatter.ISO_DATE_TIME),
                LocalDateTime.parse(endDate, DateTimeFormatter.ISO_DATE_TIME)
                
            );
            return ResponseEntity.ok(clickEventDTOs);
        } catch (Exception e) {
            return  ResponseEntity.status(500).body("Error retrieving click events: " + e.getMessage());
        }
    }
    @GetMapping("/User-Analytics")
    public ResponseEntity<?> getUserUrlAnalytics(
        @RequestParam("startDate") String startDate,
        @RequestParam("endDate") String endDate
    ) {
        try {
            
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userName = auth.getName();
            
            User user = userRepository.findByUserName(userName);
            if (user == null) {
                System.out.println("User not found in DB");
                return ResponseEntity.status(404).body("User not found");
            }

            LocalDateTime start = LocalDateTime.parse(startDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            LocalDateTime end = LocalDateTime.parse(endDate, DateTimeFormatter.ISO_LOCAL_DATE_TIME);


            List<ClickEventDTO> clickEventDTOs = urlMappingService.totalClickEventsOfUser(user, start, end);
           

            return ResponseEntity.ok(clickEventDTOs);
        } catch (Exception e) {
             return ResponseEntity.status(500).body("Server error: " + e.getMessage());
        }
    }




 }
