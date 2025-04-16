package com.project.backend.entity.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class ReserResponseDTO {

    private Long id;
    private String username;
    private String roomName;
    private Timestamp reserDate;
    private Timestamp useTime;

    @Builder
    public ReserResponseDTO(Long id, String username, String roomName, Timestamp reserDate, Timestamp useTime){
        this.id = id;
        this.username = username;
        this.roomName = roomName;
        this.reserDate = reserDate;
        this.useTime = useTime;
    }
}
