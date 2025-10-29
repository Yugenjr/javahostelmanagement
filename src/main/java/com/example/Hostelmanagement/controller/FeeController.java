package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.FeeDto;
import com.example.Hostelmanagement.entity.Fee;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.UserRepository;
import com.example.Hostelmanagement.service.FeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/fees")
public class FeeController {

    @Autowired
    private FeeService feeService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<FeeDto> create(@Valid @RequestBody Fee fee) {
        Fee createdFee = feeService.create(fee);
        return ResponseEntity.ok(FeeDto.fromEntity(createdFee));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<FeeDto> pay(@PathVariable Long id, @RequestParam String transactionId) {
        Fee paidFee = feeService.recordPayment(id, transactionId);
        return ResponseEntity.ok(FeeDto.fromEntity(paidFee));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeeDto>> getByStudent(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        List<FeeDto> fees = feeService.findByStudent(student).stream()
                .map(FeeDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(fees);
    }
}

