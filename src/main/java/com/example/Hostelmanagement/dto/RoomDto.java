package com.example.Hostelmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.Hostelmanagement.entity.Room;

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

    // Constructors
    public RoomDto() {}

    public RoomDto(Long id, String roomNumber, Room.RoomType roomType, Integer capacity,
                   Integer floor, BigDecimal monthlyRent, Room.RoomStatus status,
                   String description, String amenities, LocalDateTime createdAt,
                   LocalDateTime updatedAt, UserSummaryDto student) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.capacity = capacity;
        this.floor = floor;
        this.monthlyRent = monthlyRent;
        this.status = status;
        this.description = description;
        this.amenities = amenities;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.student = student;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public Room.RoomType getRoomType() {
        return roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Integer getFloor() {
        return floor;
    }

    public BigDecimal getMonthlyRent() {
        return monthlyRent;
    }

    public Room.RoomStatus getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public String getAmenities() {
        return amenities;
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

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public void setRoomType(Room.RoomType roomType) {
        this.roomType = roomType;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public void setMonthlyRent(BigDecimal monthlyRent) {
        this.monthlyRent = monthlyRent;
    }

    public void setStatus(Room.RoomStatus status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
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
    public static RoomDtoBuilder builder() {
        return new RoomDtoBuilder();
    }

    public static class RoomDtoBuilder {
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

        public RoomDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public RoomDtoBuilder roomNumber(String roomNumber) {
            this.roomNumber = roomNumber;
            return this;
        }

        public RoomDtoBuilder roomType(Room.RoomType roomType) {
            this.roomType = roomType;
            return this;
        }

        public RoomDtoBuilder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public RoomDtoBuilder floor(Integer floor) {
            this.floor = floor;
            return this;
        }

        public RoomDtoBuilder monthlyRent(BigDecimal monthlyRent) {
            this.monthlyRent = monthlyRent;
            return this;
        }

        public RoomDtoBuilder status(Room.RoomStatus status) {
            this.status = status;
            return this;
        }

        public RoomDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public RoomDtoBuilder amenities(String amenities) {
            this.amenities = amenities;
            return this;
        }

        public RoomDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public RoomDtoBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public RoomDtoBuilder student(UserSummaryDto student) {
            this.student = student;
            return this;
        }

        public RoomDto build() {
            return new RoomDto(id, roomNumber, roomType, capacity, floor, monthlyRent,
                               status, description, amenities, createdAt, updatedAt, student);
        }
    }

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
