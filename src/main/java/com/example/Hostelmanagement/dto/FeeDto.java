package com.example.Hostelmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.Hostelmanagement.entity.Fee;

public class FeeDto {
    private Long id;
    private BigDecimal amount;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private Fee.FeeType feeType;
    private Fee.PaymentStatus paymentStatus;
    private Fee.PaymentMethod paymentMethod;
    private String transactionId;
    private String remarks;
    private Integer month;
    private Integer year;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserSummaryDto student;

    // Constructors
    public FeeDto() {}

    public FeeDto(Long id, BigDecimal amount, LocalDate dueDate, LocalDate paidDate,
                  Fee.FeeType feeType, Fee.PaymentStatus paymentStatus, Fee.PaymentMethod paymentMethod,
                  String transactionId, String remarks, Integer month, Integer year,
                  LocalDateTime createdAt, LocalDateTime updatedAt, UserSummaryDto student) {
        this.id = id;
        this.amount = amount;
        this.dueDate = dueDate;
        this.paidDate = paidDate;
        this.feeType = feeType;
        this.paymentStatus = paymentStatus;
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.remarks = remarks;
        this.month = month;
        this.year = year;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.student = student;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public Fee.FeeType getFeeType() {
        return feeType;
    }

    public Fee.PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public Fee.PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getRemarks() {
        return remarks;
    }

    public Integer getMonth() {
        return month;
    }

    public Integer getYear() {
        return year;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public UserSummaryDto getStudent() {
        return student;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
    }

    public void setFeeType(Fee.FeeType feeType) {
        this.feeType = feeType;
    }

    public void setPaymentStatus(Fee.PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentMethod(Fee.PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setStudent(UserSummaryDto student) {
        this.student = student;
    }

    // Builder pattern
    public static FeeDtoBuilder builder() {
        return new FeeDtoBuilder();
    }

    public static class FeeDtoBuilder {
        private Long id;
        private BigDecimal amount;
        private LocalDate dueDate;
        private LocalDate paidDate;
        private Fee.FeeType feeType;
        private Fee.PaymentStatus paymentStatus;
        private Fee.PaymentMethod paymentMethod;
        private String transactionId;
        private String remarks;
        private Integer month;
        private Integer year;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private UserSummaryDto student;

        public FeeDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public FeeDtoBuilder amount(BigDecimal amount) {
            this.amount = amount;
            return this;
        }

        public FeeDtoBuilder dueDate(LocalDate dueDate) {
            this.dueDate = dueDate;
            return this;
        }

        public FeeDtoBuilder paidDate(LocalDate paidDate) {
            this.paidDate = paidDate;
            return this;
        }

        public FeeDtoBuilder feeType(Fee.FeeType feeType) {
            this.feeType = feeType;
            return this;
        }

        public FeeDtoBuilder paymentStatus(Fee.PaymentStatus paymentStatus) {
            this.paymentStatus = paymentStatus;
            return this;
        }

        public FeeDtoBuilder paymentMethod(Fee.PaymentMethod paymentMethod) {
            this.paymentMethod = paymentMethod;
            return this;
        }

        public FeeDtoBuilder transactionId(String transactionId) {
            this.transactionId = transactionId;
            return this;
        }

        public FeeDtoBuilder remarks(String remarks) {
            this.remarks = remarks;
            return this;
        }

        public FeeDtoBuilder month(Integer month) {
            this.month = month;
            return this;
        }

        public FeeDtoBuilder year(Integer year) {
            this.year = year;
            return this;
        }

        public FeeDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public FeeDtoBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public FeeDtoBuilder student(UserSummaryDto student) {
            this.student = student;
            return this;
        }

        public FeeDto build() {
            return new FeeDto(id, amount, dueDate, paidDate, feeType, paymentStatus, paymentMethod,
                              transactionId, remarks, month, year, createdAt, updatedAt, student);
        }
    }

    public static FeeDto fromEntity(Fee fee) {
        FeeDto dto = FeeDto.builder()
                .id(fee.getId())
                .amount(fee.getAmount())
                .dueDate(fee.getDueDate())
                .paidDate(fee.getPaidDate())
                .feeType(fee.getFeeType())
                .paymentStatus(fee.getPaymentStatus())
                .paymentMethod(fee.getPaymentMethod())
                .transactionId(fee.getTransactionId())
                .remarks(fee.getRemarks())
                .month(fee.getMonth())
                .year(fee.getYear())
                .createdAt(fee.getCreatedAt())
                .updatedAt(fee.getUpdatedAt())
                .build();

        if (fee.getStudent() != null) {
            dto.setStudent(UserSummaryDto.fromEntity(fee.getStudent()));
        }

        return dto;
    }
}
