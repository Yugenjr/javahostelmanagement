package com.example.Hostelmanagement.service;

import com.example.Hostelmanagement.entity.Fee;
import com.example.Hostelmanagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface FeeService {
    Fee create(Fee fee);
    Fee recordPayment(Long id, String transactionId);
    List<Fee> findByStudent(User student);
    Optional<Fee> findById(Long id);
}

