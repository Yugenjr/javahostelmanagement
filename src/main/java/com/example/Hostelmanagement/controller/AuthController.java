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
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

        // Demo credentials with user data
        if (("admin".equals(username) && "admin123".equals(password))) {
            String token = "demo-token-" + username + "-" + System.currentTimeMillis();
            User demoUser = createDemoUser(username, "Admin", "User", "ADMIN");
            return ResponseEntity.ok(new AuthResponse(token, demoUser));
        } else if (("warden1".equals(username) && "warden123".equals(password)) ||
                   ("warden".equals(username) && "warden123".equals(password))) {
            String token = "demo-token-" + username + "-" + System.currentTimeMillis();
            User demoUser = createDemoUser(username, "John", "Warden", "WARDEN");
            return ResponseEntity.ok(new AuthResponse(token, demoUser));
        } else if (("student1".equals(username) && "student123".equals(password))) {
            String token = "demo-token-" + username + "-" + System.currentTimeMillis();
            User demoUser = createDemoUser(username, "Alice", "Johnson", "STUDENT");
            demoUser.setId(1L);
            return ResponseEntity.ok(new AuthResponse(token, demoUser));
        } else if (("student2".equals(username) && "student123".equals(password))) {
            String token = "demo-token-" + username + "-" + System.currentTimeMillis();
            User demoUser = createDemoUser(username, "Bob", "Smith", "STUDENT");
            demoUser.setId(2L);
            return ResponseEntity.ok(new AuthResponse(token, demoUser));
        } else if (("student3".equals(username) && "student123".equals(password))) {
            String token = "demo-token-" + username + "-" + System.currentTimeMillis();
            User demoUser = createDemoUser(username, "Carol", "Williams", "STUDENT");
            demoUser.setId(3L);
            return ResponseEntity.ok(new AuthResponse(token, demoUser));
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    private User createDemoUser(String username, String firstName, String lastName, String role) {
        User user = new User();
        user.setId(1L);
        user.setUsername(username);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(username + "@hostel.com");
        user.setPhoneNumber("1234567890");
        user.setRole(User.Role.valueOf(role));
        return user;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        // Only Admin should normally create users; public registration is allowed here for simplicity
        User created = userService.register(user);
        return ResponseEntity.ok(created);
    }
}

