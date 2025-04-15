package com.project.backend.entity.DTO;

import com.project.backend.entity.Room;
import com.project.backend.entity.User;
import com.project.backend.entity.Reser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.sql.Time;

@Getter
@NoArgsConstructor
public class ReserRequestDTO {

    private Long id;
    private String email;
    private Long roomId;
    private Timestamp reserDate;
    private Time useTime;

    public Reser toEntity(User user, Room room) {
        return Reser.builder()
                .id(this.id)
                .user(user)
                .room(room)
                .reser_date(this.reserDate)
                .use_time(this.useTime)
                .build();
    }
}
