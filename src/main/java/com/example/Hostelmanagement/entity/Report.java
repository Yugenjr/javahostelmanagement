package com.example.Hostelmanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
}
