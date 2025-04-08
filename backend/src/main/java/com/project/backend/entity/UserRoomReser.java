package com.project.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.Timestamp;
import java.sql.Time;

@Table(name="user_room_reser")
@Entity

@Getter
@Setter
@AllArgsConstructor
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
}
