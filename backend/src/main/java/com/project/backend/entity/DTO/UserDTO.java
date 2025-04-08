package com.project.backend.entity.DTO;

import com.project.backend.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String email;
    private String username;
    private String role;

    @Builder
    public UserDTO(Long id, String email, String username, String role) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.role = role;
    }

    public User toEntity() {
        return User.builder()
                .email(this.email)
                .username(this.username)
                .role(this.role)
                .build();
    }

}
