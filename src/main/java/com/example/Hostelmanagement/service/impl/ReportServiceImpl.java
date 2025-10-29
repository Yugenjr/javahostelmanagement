package com.example.Hostelmanagement.service.impl;

import com.example.Hostelmanagement.entity.Report;
import com.example.Hostelmanagement.entity.User;
import com.example.Hostelmanagement.repository.ReportRepository;
import com.example.Hostelmanagement.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Override
    public Report generateReport(Report report) {
        // Placeholder for actual generation (PDF/Excel)
        return reportRepository.save(report);
    }

    @Override
    public List<Report> findByUser(User user) {
        return reportRepository.findByGeneratedBy(user);
    }

    @Override
    public Optional<Report> findById(Long id) {
        return reportRepository.findById(id);
    }
}

