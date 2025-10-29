package com.example.Hostelmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintType type;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComplaintStatus status = ComplaintStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String wardenRemarks;

    @Column(columnDefinition = "TEXT")
    private String response;

    private LocalDateTime resolvedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Many-to-One relationship with User (Student)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @NotNull(message = "Student is required")
    @JsonBackReference("user-complaints")
    private User student;

    // Many-to-One relationship with User (Warden who handles the complaint)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_warden_id")
    private User assignedWarden;

    public enum ComplaintType {
        ELECTRICAL, PLUMBING, FURNITURE, CLEANING, INTERNET, SECURITY, OTHER
    }

    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }

    public enum ComplaintStatus {
        PENDING, IN_PROGRESS, RESOLVED, CLOSED, REJECTED
    }

    public boolean isPending() {
        return status == ComplaintStatus.PENDING;
    }

    public boolean isResolved() {
        return status == ComplaintStatus.RESOLVED || status == ComplaintStatus.CLOSED;
    }
}
