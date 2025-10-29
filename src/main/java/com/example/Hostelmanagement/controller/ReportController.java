package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.entity.Report;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.UserRepository;
import com.example.Hostelmanagement.service.ReportService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Report> generate(@Valid @RequestBody Report report) {
        return ResponseEntity.ok(reportService.generateReport(report));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Report>> getByUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(reportService.findByUser(user));
    }
}

