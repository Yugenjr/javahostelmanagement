package com.example.Hostelmanagement.service;

import com.example.Hostelmanagement.entity.Report;
import com.example.Hostelmanagement.entity.User;

import java.util.List;
import java.util.Optional;

public interface ReportService {
    Report generateReport(Report report);
    List<Report> findByUser(User user);
    Optional<Report> findById(Long id);
}

