package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
