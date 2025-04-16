package com.project.backend.entity.DTO;

import com.project.backend.entity.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class RoomDTO {
    private Long id;
    private String roomName;

    @Builder
    public RoomDTO(Long id, String roomName) {
        this.id = id;
        this.roomName = roomName;
    }

    public Room toEntity() {
        return Room.builder()
                .id(this.id)
                .roomName(this.roomName)
                .build();
    }
}
