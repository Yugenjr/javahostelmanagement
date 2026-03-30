package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.UserDto;
import com.example.Hostelmanagement.dto.UserSummaryDto;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<List<UserSummaryDto>> getAllUsers(@RequestParam(required = false) String role) {
        List<UserSummaryDto> users;
        if (role != null && !role.isEmpty()) {
            try {
                User.Role userRole = User.Role.valueOf(role.toUpperCase());
                users = userRepository.findByRole(userRole).stream()
                        .map(UserSummaryDto::fromEntity)
                        .collect(Collectors.toList());
            } catch (IllegalArgumentException e) {
                users = userRepository.findAll().stream()
                        .map(UserSummaryDto::fromEntity)
                        .collect(Collectors.toList());
            }
        } else {
            users = userRepository.findAll().stream()
                    .map(UserSummaryDto::fromEntity)
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(u -> ResponseEntity.ok(UserDto.fromEntity(u)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<List<UserSummaryDto>> getUsersByRole(@PathVariable User.Role role) {
        List<UserSummaryDto> users = userRepository.findByRole(role).stream()
                .map(UserSummaryDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        Optional<User> existing = userRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        User u = existing.get();
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        u.setPhoneNumber(user.getPhoneNumber());
        u.setAddress(user.getAddress());
        u.setEmergencyContact(user.getEmergencyContact());
        u.setActive(user.getActive());
        User updatedUser = userRepository.save(u);
        return ResponseEntity.ok(UserDto.fromEntity(updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
