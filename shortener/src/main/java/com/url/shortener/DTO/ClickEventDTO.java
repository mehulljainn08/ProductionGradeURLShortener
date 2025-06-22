package com.url.shortener.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClickEventDTO {
    private String shortUrl;
    private LocalDate clickDate;
    private long clickCount;

    
}
