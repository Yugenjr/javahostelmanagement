package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.Room;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomSummaryDto {
    private Long id;
    private String roomNumber;
    private Room.RoomType roomType;
    private Integer capacity;
    private Integer floor;
    private BigDecimal monthlyRent;
    private Room.RoomStatus status;
    private String description;
    private String amenities;

    public static RoomSummaryDto fromEntity(Room room) {
        if (room == null) {
            return null;
        }

        return RoomSummaryDto.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .roomType(room.getRoomType())
                .capacity(room.getCapacity())
                .floor(room.getFloor())
                .monthlyRent(room.getMonthlyRent())
                .status(room.getStatus())
                .description(room.getDescription())
                .amenities(room.getAmenities())
                .build();
    }
}
