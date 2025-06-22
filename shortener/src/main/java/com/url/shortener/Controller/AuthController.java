package com.url.shortener.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.Jwt.JwtUtils;
import com.url.shortener.Repository.UserRepository;
import com.url.shortener.entity.User;
import com.url.shortener.service.UserDetailsServiceImpl;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> signup(@RequestBody User user) {
        String username = user.getUserName();
        if(userRepository.findByUserName(username) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setRole("USER"); 
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        try {
            String userName=user.getUserName();
            User existingUser = userRepository.findByUserName(userName);
            if(existingUser == null || !encoder.matches(user.getPassword(), existingUser.getPassword())) {
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            String token=jwtUtils.generateToken(userDetails);
            return ResponseEntity.ok(token);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(500).body("Error during login"+ e.getMessage());
        }
        
    }

}
