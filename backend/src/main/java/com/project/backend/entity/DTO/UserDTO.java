package com.project.backend.entity.DTO;

import com.project.backend.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor
public class UserDTO {

    private String email;
    private String username;
    private String password;
    private String role;

    @Builder
    public UserDTO(String email, String username, String password, String role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(this.email)
                .username(this.username)
                .password(passwordEncoder.encode(this.password))
                .role("ROLE_USER")
                .build();
    }

}
