package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.AuthRequest;
import com.example.Hostelmanagement.dto.AuthResponse;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.UserRepository;
import com.example.Hostelmanagement.security.JwtUtil;
import com.example.Hostelmanagement.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            String username = request.getUsername();
            String password = request.getPassword();

            // Find user in database
            Optional<User> userOptional = userRepository.findByUsername(username);

            if (userOptional.isEmpty()) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid username or password"));
            }

            User user = userOptional.get();

            // Verify password
            if (!passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "Invalid username or password"));
            }

            // Check if user is active
            if (user.getActive() == null || !user.getActive()) {
                return ResponseEntity.status(401)
                    .body(Map.of("message", "Account is inactive. Please contact administrator."));
            }

            // Generate JWT token with user role
            String token = jwtUtil.generateToken(username, List.of(user.getRole().name()));

            // Return response with token and user data
            return ResponseEntity.ok(new AuthResponse(token, user));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(Map.of("message", "Login failed: " + e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            // Check if username already exists
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Username already exists"));
            }

            // Check if email already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
            }

            // Set user as active
            user.setActive(true);

            // Register user (password will be encoded in service)
            User created = userService.register(user);

            // Remove password from response
            created.setPassword(null);

            return ResponseEntity.ok(created);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }
}

