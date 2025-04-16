package com.project.backend.entity;

import com.project.backend.entity.DTO.RoomDTO;
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
    @Column(name = "id", nullable = false, length = 10)
    private Long id;

    @Column(name = "room_name", nullable = false, length = 30)
    private String roomName;

    public RoomDTO toDTO() {
        return RoomDTO
                .builder()
                .id(id)
                .roomName(roomName)
                .build();
    }

    @Builder
    public Room(Long id, String roomName) {
        this.id = id;
        this.roomName = roomName;
    }
}
