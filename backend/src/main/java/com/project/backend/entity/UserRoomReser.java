package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.security.Timestamp;
import java.sql.Time;

@Table(name="user_room_reser")
@Entity

@Getter
@Setter
@NoArgsConstructor
public class UserRoomReser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column
    private Timestamp reser_date;

    @Column
    private Time use_time;

    @Builder
    public UserRoomReser(Long id, User user, Room room, Timestamp reser_date, Time use_time){
        this.id = id;
        this.user = user;
        this.room = room;
        this.reser_date = reser_date;
        this.use_time = use_time;
    }
}
