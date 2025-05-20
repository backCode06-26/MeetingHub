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
    private double startDate;
    private double endDate;

    @Builder
    public ReserResponseDTO(Long id, String username, String roomName, Timestamp reserDate, double startDate, double endDate){
        this.id = id;
        this.username = username;
        this.roomName = roomName;
        this.reserDate = reserDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
