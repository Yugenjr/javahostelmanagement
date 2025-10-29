package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.Complaint;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintDto {
    private Long id;
    private String title;
    private String description;
    private Complaint.ComplaintType type;
    private Complaint.ComplaintStatus status;
    private Complaint.Priority priority;
    private String response;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserSummaryDto student;

    public static ComplaintDto fromEntity(Complaint complaint) {
        if (complaint == null) {
            return null;
        }

        ComplaintDto dto = ComplaintDto.builder()
                .id(complaint.getId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .type(complaint.getType())
                .status(complaint.getStatus())
                .priority(complaint.getPriority())
                .response(complaint.getResponse())
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .build();

        // Only include student summary to avoid circular reference
        if (complaint.getStudent() != null) {
            dto.setStudent(UserSummaryDto.fromEntity(complaint.getStudent()));
        }

        return dto;
    }
}
