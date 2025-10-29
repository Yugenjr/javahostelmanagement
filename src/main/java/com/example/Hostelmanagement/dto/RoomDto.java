package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.Room;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDto {
    private Long id;
    private String roomNumber;
    private Room.RoomType roomType;
    private Integer capacity;
    private Integer floor;
    private BigDecimal monthlyRent;
    private Room.RoomStatus status;
    private String description;
    private String amenities;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserSummaryDto student;

    public static RoomDto fromEntity(Room room) {
        if (room == null) {
            return null;
        }

        RoomDto dto = RoomDto.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .roomType(room.getRoomType())
                .capacity(room.getCapacity())
                .floor(room.getFloor())
                .monthlyRent(room.getMonthlyRent())
                .status(room.getStatus())
                .description(room.getDescription())
                .amenities(room.getAmenities())
                .createdAt(room.getCreatedAt())
                .updatedAt(room.getUpdatedAt())
                .build();

        // Only include student summary to avoid circular reference
        if (room.getStudent() != null) {
            dto.setStudent(UserSummaryDto.fromEntity(room.getStudent()));
        }

        return dto;
    }
}
