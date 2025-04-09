package com.project.backend.entity.DTO;

import com.project.backend.entity.Room;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RoomDTO {
    private Long id;
    private String roomName;

    public RoomDTO(Long id, String roomName) {
        this.id = id;
        this.roomName = roomName;
    };

    @Builder
    public Room toEntity() {
        return Room.builder()
                .id(this.id)
                .roomName(this.roomName)
                .build();
    }
}
