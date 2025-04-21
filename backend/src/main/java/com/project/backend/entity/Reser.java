package com.project.backend.entity;

import com.project.backend.entity.DTO.ReserResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

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
    private Timestamp reserDate;

    @Column(name = "use_time", nullable = false)
    private Timestamp useTime;

    @Builder
    public Reser(Long id, User user, Room room, Timestamp reserDate, Timestamp useTime){
        this.id = id;
        this.user = user;
        this.room = room;
        this.reserDate = reserDate;
        this.useTime = useTime;
    }

    public ReserResponseDTO toDTO(){
        return ReserResponseDTO.builder()
                .id(this.id)
                .username(this.user.getUsername())
                .roomName(this.room.getRoomName())
                .reserDate(this.reserDate)
                .useTime(this.useTime)
                .build();
    }
}
