package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "rooms")
@Entity

@Setter
@Getter
@NoArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String roomName;

    @Builder
    public Room(Long id, String roomName) {
        this.id = id;
        this.roomName = roomName;
    }
}
