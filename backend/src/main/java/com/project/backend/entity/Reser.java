package com.project.backend.entity;

import com.project.backend.entity.DTO.ReserResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.security.Timestamp;
import java.sql.Time;

@Table(name="user_room_reser")
@Entity

@Getter
@Setter
@NoArgsConstructor
public class Reser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "reser_date", nullable = false)
    private Timestamp reser_date;

    @Column(name = "use_time", nullable = false)
    private Timestamp use_time;

    @Builder
    public Reser(Long id, User user, Room room, Timestamp reser_date, Timestamp use_time){
        this.id = id;
        this.user = user;
        this.room = room;
        this.reser_date = reser_date;
        this.use_time = use_time;
    }

    public ReserResponseDTO toDTO(){
        ReserResponseDTO.builder()
                .id(this.id)
                .username(this.user.getUsername())
                .roomName(this.room.getRoomName())
                .reserDate(this.reser_date)
                .useTime(this.use_time)
                .build();
    }
}
