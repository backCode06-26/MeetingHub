package com.project.backend.entity.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.backend.entity.Room;
import com.project.backend.entity.User;
import com.project.backend.entity.Reser;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Timestamp;

@Getter
@ToString
@NoArgsConstructor
public class ReserRequestDTO {

    private Long id;
    private String email;
    private Long roomId;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Timestamp reserDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private Timestamp useTime;

    public Reser toEntity(User user, Room room) {
        return Reser.builder()
                .id(this.id)
                .user(user)
                .room(room)
                .reserDate(this.reserDate)
                .useTime(this.useTime)
                .build();
    }
}
