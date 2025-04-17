package com.project.backend.controller;

import com.project.backend.entity.DTO.RoomDTO;
import com.project.backend.entity.Room;
import com.project.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // 생성
    @PostMapping("/api/room/create")
    public ResponseEntity<Room> createRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.createRoom(roomDTO);
    }

    // 읽기
    @GetMapping("/api/room/all")
    public ResponseEntity<List<RoomDTO>> readRoom() {
        return roomService.readRoom();
    }

    // 수정
    @PatchMapping("/api/room/update")
    public ResponseEntity<Room> updateRoom(@RequestBody RoomDTO roomDTO) {
        return roomService.updateRoom(roomDTO);
    }

    // 삭제
    @DeleteMapping("api/room/delete/{id}")
    public ResponseEntity<List<RoomDTO>> deleteRoom(@PathVariable Long id) {
        return roomService.deleteRoom(id);
    }
}
