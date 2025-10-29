package com.example.Hostelmanagement.dto;

import com.example.Hostelmanagement.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
