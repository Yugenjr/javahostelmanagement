package com.example.Hostelmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "rooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Room number is required")
    @Column(unique = true, nullable = false)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType roomType;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    @Column(nullable = false)
    private Integer capacity;

    @NotNull(message = "Floor is required")
    @Min(value = 1, message = "Floor must be at least 1")
    @Column(nullable = false)
    private Integer floor;

    @NotNull(message = "Monthly rent is required")
    @Min(value = 0, message = "Monthly rent cannot be negative")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal monthlyRent;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomStatus status = RoomStatus.AVAILABLE;

    private String description;

    private String amenities;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // One-to-One relationship with User (Student)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @JsonBackReference("room-student")
    private User student;

    public enum RoomType {
        SINGLE, DOUBLE, TRIPLE, DORMITORY
    }

    public enum RoomStatus {
        AVAILABLE, OCCUPIED, MAINTENANCE, OUT_OF_ORDER
    }

    public boolean isAvailable() {
        return status == RoomStatus.AVAILABLE;
    }

    public boolean isOccupied() {
        return status == RoomStatus.OCCUPIED;
    }
}
