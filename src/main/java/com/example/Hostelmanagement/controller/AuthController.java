package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.AuthRequest;
import com.example.Hostelmanagement.dto.AuthResponse;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.security.JwtUtil;
import com.example.Hostelmanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Demo credentials bypass
        if (("admin".equals(username) && "admin123".equals(password)) ||
            ("warden1".equals(username) && "warden123".equals(password)) ||
            ("student1".equals(username) && "student123".equals(password)) ||
            ("student2".equals(username) && "student123".equals(password)) ||
            ("student3".equals(username) && "student123".equals(password))) {
            String token = "demo-token-" + username;
            return ResponseEntity.ok(new AuthResponse(token));
        }

        return ResponseEntity.status(401).body("Invalid demo credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        // Only Admin should normally create users; public registration is allowed here for simplicity
        User created = userService.register(user);
        return ResponseEntity.ok(created);
    }
}

