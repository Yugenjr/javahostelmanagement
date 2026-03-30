package com.example.Hostelmanagement.dto;

import java.time.LocalDateTime;

import com.example.Hostelmanagement.entity.Complaint;

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

    // Constructors
    public ComplaintDto() {}

    public ComplaintDto(Long id, String title, String description, Complaint.ComplaintType type,
                        Complaint.ComplaintStatus status, Complaint.Priority priority, String response,
                        LocalDateTime createdAt, LocalDateTime updatedAt, UserSummaryDto student) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.priority = priority;
        this.response = response;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.student = student;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Complaint.ComplaintType getType() {
        return type;
    }

    public Complaint.ComplaintStatus getStatus() {
        return status;
    }

    public Complaint.Priority getPriority() {
        return priority;
    }

    public String getResponse() {
        return response;
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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setType(Complaint.ComplaintType type) {
        this.type = type;
    }

    public void setStatus(Complaint.ComplaintStatus status) {
        this.status = status;
    }

    public void setPriority(Complaint.Priority priority) {
        this.priority = priority;
    }

    public void setResponse(String response) {
        this.response = response;
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
    public static ComplaintDtoBuilder builder() {
        return new ComplaintDtoBuilder();
    }

    public static class ComplaintDtoBuilder {
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

        public ComplaintDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ComplaintDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ComplaintDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ComplaintDtoBuilder type(Complaint.ComplaintType type) {
            this.type = type;
            return this;
        }

        public ComplaintDtoBuilder status(Complaint.ComplaintStatus status) {
            this.status = status;
            return this;
        }

        public ComplaintDtoBuilder priority(Complaint.Priority priority) {
            this.priority = priority;
            return this;
        }

        public ComplaintDtoBuilder response(String response) {
            this.response = response;
            return this;
        }

        public ComplaintDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ComplaintDtoBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ComplaintDtoBuilder student(UserSummaryDto student) {
            this.student = student;
            return this;
        }

        public ComplaintDto build() {
            return new ComplaintDto(id, title, description, type, status, priority, response,
                                    createdAt, updatedAt, student);
        }
    }

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
