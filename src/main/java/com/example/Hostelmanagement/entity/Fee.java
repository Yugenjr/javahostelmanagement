package com.example.Hostelmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Amount is required")
    @Min(value = 0, message = "Amount cannot be negative")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Due date is required")
    @Column(nullable = false)
    private LocalDate dueDate;

    private LocalDate paidDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FeeType feeType;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String transactionId;

    private String remarks;

    @NotNull(message = "Month is required")
    @Column(nullable = false)
    private Integer month;

    @NotNull(message = "Year is required")
    @Column(nullable = false)
    private Integer year;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Many-to-One relationship with User (Student)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @NotNull(message = "Student is required")
    @JsonBackReference("user-fees")
    private User student;

    public enum FeeType {
        HOSTEL_FEE, MESS_FEE, SECURITY_DEPOSIT, MAINTENANCE_FEE, OTHER
    }

    public enum PaymentStatus {
        PENDING, PAID, OVERDUE, PARTIAL, CANCELLED
    }

    public enum PaymentMethod {
        CASH, CARD, BANK_TRANSFER, UPI, CHEQUE, ONLINE
    }

    public boolean isPaid() {
        return paymentStatus == PaymentStatus.PAID;
    }

    public boolean isOverdue() {
        return paymentStatus != PaymentStatus.PAID && dueDate.isBefore(LocalDate.now());
    }
}
