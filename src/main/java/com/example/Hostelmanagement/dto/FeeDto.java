package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.Fee;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
