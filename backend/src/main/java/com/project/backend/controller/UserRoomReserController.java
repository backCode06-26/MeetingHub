package com.project.backend.controller;

import com.project.backend.entity.DTO.UserRoomReserDTO;
import com.project.backend.entity.Room;
import com.project.backend.entity.UserRoomReser;
import com.project.backend.service.RoomService;
import com.project.backend.service.UserRoomReserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserRoomReserController {

    private final UserRoomReserService userRoomReserService;

    @Autowired
    public UserRoomReserController(UserRoomReserService userRoomReserService) {
        this.userRoomReserService = userRoomReserService;
    }

    // 생성
    @PostMapping("/api/reser/create")
    public ResponseEntity<UserRoomReser> createRoom(
            @RequestBody UserRoomReserDTO userRoomReserDTO
    ) {
        return userRoomReserService.createUserRoomReser(userRoomReserDTO);
    }

    // 읽기
    @GetMapping("/api/reser")
    public ResponseEntity<List<UserRoomReser>> readRoom() {
        return userRoomReserService.readUserRoomReser();
    }

    // 수정
    @PatchMapping("/api/reser/update")
    public ResponseEntity<UserRoomReser> updateRoom(@RequestBody UserRoomReserDTO userRoomReserDTO) {
        return userRoomReserService.updateUserRoomReser(userRoomReserDTO);
    }
}
