package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.User;

public class UserSummaryDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private User.Role role;
    private Boolean active;
    private String profileImage;

    // Constructors
    public UserSummaryDto() {}

    public UserSummaryDto(Long id, String username, String firstName, String lastName, String email,
                          String phoneNumber, User.Role role, Boolean active, String profileImage) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.active = active;
        this.profileImage = profileImage;
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

    // Builder pattern
    public static UserSummaryDtoBuilder builder() {
        return new UserSummaryDtoBuilder();
    }

    public static class UserSummaryDtoBuilder {
        private Long id;
        private String username;
        private String firstName;
        private String lastName;
        private String email;
        private String phoneNumber;
        private User.Role role;
        private Boolean active;
        private String profileImage;

        public UserSummaryDtoBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserSummaryDtoBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserSummaryDtoBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public UserSummaryDtoBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public UserSummaryDtoBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserSummaryDtoBuilder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public UserSummaryDtoBuilder role(User.Role role) {
            this.role = role;
            return this;
        }

        public UserSummaryDtoBuilder active(Boolean active) {
            this.active = active;
            return this;
        }

        public UserSummaryDtoBuilder profileImage(String profileImage) {
            this.profileImage = profileImage;
            return this;
        }

        public UserSummaryDto build() {
            return new UserSummaryDto(id, username, firstName, lastName, email, phoneNumber, role, active, profileImage);
        }
    }

    public static UserSummaryDto fromEntity(User user) {
        if (user == null) {
            return null;
        }

        return UserSummaryDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .role(user.getRole())
                .active(user.getActive())
                .profileImage(user.getProfileImage())
                .build();
    }
}
