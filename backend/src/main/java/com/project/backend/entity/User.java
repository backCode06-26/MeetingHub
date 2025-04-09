package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")

@Setter
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String username;

    @Column
    private String password;

    @Column(name = "role")
    private String role;

    @Builder
    public  User(String email, String username, String password, String role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}
