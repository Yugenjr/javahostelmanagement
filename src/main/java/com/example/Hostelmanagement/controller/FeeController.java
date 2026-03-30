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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<List<FeeDto>> getAllFees() {
        List<FeeDto> fees = feeService.findAll().stream()
                .map(FeeDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(fees);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<FeeDto> pay(@PathVariable Long id, @RequestBody PaymentRequest request) {
        Fee paidFee = feeService.recordPayment(id, request.getTransactionId());
        return ResponseEntity.ok(FeeDto.fromEntity(paidFee));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<FeeDto> update(@PathVariable Long id, @Valid @RequestBody Fee fee) {
        Fee updatedFee = feeService.update(id, fee);
        return ResponseEntity.ok(FeeDto.fromEntity(updatedFee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeeDto> getById(@PathVariable Long id) {
        return feeService.findById(id)
                .map(fee -> ResponseEntity.ok(FeeDto.fromEntity(fee)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FeeDto>> getByStudent(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        List<FeeDto> fees = feeService.findByStudent(student).stream()
                .map(FeeDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(fees);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        feeService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Payment request DTO
    public static class PaymentRequest {
        private String transactionId;
        private String paymentMethod;
        private String paidDate;

        public String getTransactionId() {
            return transactionId;
        }

        public void setTransactionId(String transactionId) {
            this.transactionId = transactionId;
        }

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }

        public String getPaidDate() {
            return paidDate;
        }

        public void setPaidDate(String paidDate) {
            this.paidDate = paidDate;
        }
    }
}

