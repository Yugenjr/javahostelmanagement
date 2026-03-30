package com.example.Hostelmanagement.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Report name is required")
    @Column(nullable = false)
    private String reportName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportType reportType;

    @Column(columnDefinition = "TEXT")
    private String reportData;

    private String filePath;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileFormat fileFormat;

    @CreationTimestamp
    private LocalDateTime generatedAt;

    // Many-to-One relationship with User (Who generated the report)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "generated_by", nullable = false)
    private User generatedBy;

    public enum ReportType {
        STUDENT_REPORT, ROOM_OCCUPANCY_REPORT, FEE_COLLECTION_REPORT,
        COMPLAINT_ANALYSIS_REPORT, MONTHLY_SUMMARY_REPORT, ANNUAL_REPORT
    }

    public enum FileFormat {
        PDF, EXCEL, CSV
    }

    // Constructors
    public Report() {}

    public Report(String reportName, ReportType reportType, String reportData, 
                  String filePath, FileFormat fileFormat, User generatedBy) {
        this.reportName = reportName;
        this.reportType = reportType;
        this.reportData = reportData;
        this.filePath = filePath;
        this.fileFormat = fileFormat;
        this.generatedBy = generatedBy;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getReportName() {
        return reportName;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public String getReportData() {
        return reportData;
    }

    public String getFilePath() {
        return filePath;
    }

    public FileFormat getFileFormat() {
        return fileFormat;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public User getGeneratedBy() {
        return generatedBy;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setReportName(String reportName) {
        this.reportName = reportName;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public void setReportData(String reportData) {
        this.reportData = reportData;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setFileFormat(FileFormat fileFormat) {
        this.fileFormat = fileFormat;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public void setGeneratedBy(User generatedBy) {
        this.generatedBy = generatedBy;
    }

    // Builder pattern
    public static ReportBuilder builder() {
        return new ReportBuilder();
    }

    public static class ReportBuilder {
        private String reportName;
        private ReportType reportType;
        private String reportData;
        private String filePath;
        private FileFormat fileFormat;
        private User generatedBy;

        public ReportBuilder reportName(String reportName) {
            this.reportName = reportName;
            return this;
        }

        public ReportBuilder reportType(ReportType reportType) {
            this.reportType = reportType;
            return this;
        }

        public ReportBuilder reportData(String reportData) {
            this.reportData = reportData;
            return this;
        }

        public ReportBuilder filePath(String filePath) {
            this.filePath = filePath;
            return this;
        }

        public ReportBuilder fileFormat(FileFormat fileFormat) {
            this.fileFormat = fileFormat;
            return this;
        }

        public ReportBuilder generatedBy(User generatedBy) {
            this.generatedBy = generatedBy;
            return this;
        }

        public Report build() {
            return new Report(reportName, reportType, reportData, filePath, fileFormat, generatedBy);
        }
    }
}
