package com.project.backend.entity.DTO;

import com.project.backend.entity.Room;
import com.project.backend.entity.User;
import com.project.backend.entity.UserRoomReser;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.sql.Time;

@Getter
@NoArgsConstructor
public class UserRoomReserDTO {

    private Long id;
    private String email;
    private Long roomId;
    private Timestamp reserDate;
    private Time useTime;

    public UserRoomReser toEntity(User user, Room room) {
        return UserRoomReser.builder()
                .id(this.id)
                .user(user)
                .room(room)
                .reser_date(this.reserDate)
                .use_time(this.useTime)
                .build();
    }
}
