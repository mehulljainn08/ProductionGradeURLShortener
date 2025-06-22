package com.url.shortener.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
public class User {
    @Id
    private String userId; // MongoDB uses String IDs like ObjectId
    private String email;
    private String userName;
    private String password;
    private String role = "ROLE_USER";
}
