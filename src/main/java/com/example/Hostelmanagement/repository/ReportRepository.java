package com.example.Hostelmanagement.repository;

import com.example.Hostelmanagement.entity.Report;
import com.example.Hostelmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByGeneratedBy(User user);

    List<Report> findByReportType(Report.ReportType type);
}

