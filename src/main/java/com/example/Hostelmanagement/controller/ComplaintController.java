package com.example.Hostelmanagement.controller;

import com.example.Hostelmanagement.dto.ComplaintDto;
import com.example.Hostelmanagement.entity.Complaint;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.service.ComplaintService;
import com.example.Hostelmanagement.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<List<ComplaintDto>> getAll() {
        List<ComplaintDto> complaints = complaintService.findAll().stream()
                .map(ComplaintDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintDto> getById(@PathVariable Long id) {
        return complaintService.findById(id)
                .map(complaint -> ResponseEntity.ok(ComplaintDto.fromEntity(complaint)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<ComplaintDto>> getByStudent(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        List<ComplaintDto> complaints = complaintService.findByStudent(student).stream()
                .map(ComplaintDto::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(complaints);
    }

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ComplaintDto> create(@Valid @RequestBody Complaint complaint) {
        Complaint createdComplaint = complaintService.create(complaint);
        return ResponseEntity.ok(ComplaintDto.fromEntity(createdComplaint));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComplaintDto> update(@PathVariable Long id, @Valid @RequestBody Complaint complaint) {
        Complaint updatedComplaint = complaintService.update(id, complaint);
        return ResponseEntity.ok(ComplaintDto.fromEntity(updatedComplaint));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('WARDEN') or hasRole('ADMIN')")
    public ResponseEntity<ComplaintDto> updateStatus(@PathVariable Long id, @RequestParam Complaint.ComplaintStatus status, @RequestParam(required = false) String remarks) {
        Complaint updatedComplaint = complaintService.updateStatus(id, status, remarks);
        return ResponseEntity.ok(ComplaintDto.fromEntity(updatedComplaint));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('WARDEN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        complaintService.delete(id);
        return ResponseEntity.ok().build();
    }
}

