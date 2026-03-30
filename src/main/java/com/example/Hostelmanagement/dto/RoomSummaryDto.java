package com.example.Hostelmanagement.dto;

import java.math.BigDecimal;

import com.example.Hostelmanagement.entity.Room;

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

    // Constructors
    public RoomSummaryDto() {}

    public RoomSummaryDto(Long id, String roomNumber, Room.RoomType roomType, Integer capacity,
                          Integer floor, BigDecimal monthlyRent, Room.RoomStatus status,
                          String description, String amenities) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.capacity = capacity;
        this.floor = floor;
        this.monthlyRent = monthlyRent;
        this.status = status;
        this.description = description;
        this.amenities = amenities;
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

    // Builder pattern
    public static RoomSummaryDtoBuilder builder() {
        return new RoomSummaryDtoBuilder();
    }

    public static class RoomSummaryDtoBuilder {
        private Long id;
        private String roomNumber;
        private Room.RoomType roomType;
        private Integer capacity;
        private Integer floor;
        private BigDecimal monthlyRent;
        private Room.RoomStatus status;
        private String description;
        private String amenities;

        public RoomSummaryDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public RoomSummaryDtoBuilder roomNumber(String roomNumber) {
            this.roomNumber = roomNumber;
            return this;
        }

        public RoomSummaryDtoBuilder roomType(Room.RoomType roomType) {
            this.roomType = roomType;
            return this;
        }

        public RoomSummaryDtoBuilder capacity(Integer capacity) {
            this.capacity = capacity;
            return this;
        }

        public RoomSummaryDtoBuilder floor(Integer floor) {
            this.floor = floor;
            return this;
        }

        public RoomSummaryDtoBuilder monthlyRent(BigDecimal monthlyRent) {
            this.monthlyRent = monthlyRent;
            return this;
        }

        public RoomSummaryDtoBuilder status(Room.RoomStatus status) {
            this.status = status;
            return this;
        }

        public RoomSummaryDtoBuilder description(String description) {
            this.description = description;
            return this;
        }

        public RoomSummaryDtoBuilder amenities(String amenities) {
            this.amenities = amenities;
            return this;
        }

        public RoomSummaryDto build() {
            return new RoomSummaryDto(id, roomNumber, roomType, capacity, floor, monthlyRent, status, description, amenities);
        }
    }

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
