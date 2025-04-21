package com.project.backend.controller;

import com.project.backend.entity.DTO.ReserRequestDTO;
import com.project.backend.entity.DTO.ReserResponseDTO;
import com.project.backend.entity.Reser;
import com.project.backend.service.ReserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReserController {

    private final ReserService reserService;

    @Autowired
    public ReserController(ReserService reserService) {
        this.reserService = reserService;
    }

    // 생성
    @PostMapping("/api/reser/create")
    public ResponseEntity<?> createRoom(
            @RequestBody ReserRequestDTO reserRequestDTO
    ) {
        return reserService.createUserRoomReser(reserRequestDTO);
    }

    // 읽기
    @GetMapping("/api/reser/all")
    public ResponseEntity<List<ReserResponseDTO>> readRoom() {
        return reserService.readUserRoomReser();
    }

    // 수정
    @PatchMapping("/api/reser/update")
    public ResponseEntity<Reser> updateRoom(@RequestBody ReserRequestDTO reserRequestDTO) {
        return reserService.updateUserRoomReser(reserRequestDTO);
    }
}
