package com.project.backend.entity;

import com.project.backend.entity.DTO.ReserResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Table(name="resers")
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
    private Timestamp reserDate;

    @Column(name = "start_date", nullable = false)
    private double startDate;

    @Column(name = "end_date", nullable = false)
    private double endDate;

    @Builder
    public Reser(Long id, User user, Room room, Timestamp reserDate, double startDate, double endDate){
        this.id = id;
        this.user = user;
        this.room = room;
        this.reserDate = reserDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public ReserResponseDTO toDTO(){
        return ReserResponseDTO.builder()
                .id(this.id)
                .username(this.user.getUsername())
                .roomName(this.room.getRoomName())
                .reserDate(this.reserDate)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .build();
    }
}
