package com.example.Hostelmanagement.dto;

import java.time.LocalDateTime;

import com.example.Hostelmanagement.entity.User;

public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private User.Role role;
    private Boolean active;
    private String profileImage;
    private String address;
    private String emergencyContact;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private RoomSummaryDto room;

    // Constructors
    public UserDto() {}

    public UserDto(Long id, String username, String firstName, String lastName, String email,
                   String phoneNumber, User.Role role, Boolean active, String profileImage,
                   String address, String emergencyContact, LocalDateTime createdAt,
                   LocalDateTime updatedAt, RoomSummaryDto room) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.active = active;
        this.profileImage = profileImage;
        this.address = address;
        this.emergencyContact = emergencyContact;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.room = room;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public User.Role getRole() {
        return role;
    }

    public Boolean getActive() {
        return active;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getAddress() {
        return address;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public RoomSummaryDto getRoom() {
        return room;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setRole(User.Role role) {
        this.role = role;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setRoom(RoomSummaryDto room) {
        this.room = room;
    }

    // Builder pattern
    public static UserDtoBuilder builder() {
        return new UserDtoBuilder();
    }

    public static class UserDtoBuilder {
        private Long id;
        private String username;
        private String firstName;
        private String lastName;
        private String email;
        private String phoneNumber;
        private User.Role role;
        private Boolean active;
        private String profileImage;
        private String address;
        private String emergencyContact;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private RoomSummaryDto room;

        public UserDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserDtoBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserDtoBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserDtoBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserDtoBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserDtoBuilder role(User.Role role) {
            this.role = role;
            return this;
        }

        public UserDtoBuilder active(Boolean active) {
            this.active = active;
            return this;
        }

        public UserDtoBuilder profileImage(String profileImage) {
            this.profileImage = profileImage;
            return this;
        }

        public UserDtoBuilder address(String address) {
            this.address = address;
            return this;
        }

        public UserDtoBuilder emergencyContact(String emergencyContact) {
            this.emergencyContact = emergencyContact;
            return this;
        }

        public UserDtoBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserDtoBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public UserDtoBuilder room(RoomSummaryDto room) {
            this.room = room;
            return this;
        }

        public UserDto build() {
            return new UserDto(id, username, firstName, lastName, email, phoneNumber, role, active,
                               profileImage, address, emergencyContact, createdAt, updatedAt, room);
        }
    }

    public static UserDto fromEntity(User user) {
        if (user == null) {
            return null;
        }

        UserDto dto = UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .active(user.getActive())
                .profileImage(user.getProfileImage())
                .address(user.getAddress())
                .emergencyContact(user.getEmergencyContact())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        // Only include room summary to avoid circular reference
        if (user.getRoom() != null) {
            dto.setRoom(RoomSummaryDto.fromEntity(user.getRoom()));
        }

        return dto;
    }
}
