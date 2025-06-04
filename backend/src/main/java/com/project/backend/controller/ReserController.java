package com.project.backend.controller;

import com.project.backend.entity.CustomUserDetails;
import com.project.backend.entity.DTO.ReserRequestDTO;
import com.project.backend.entity.DTO.ReserResponseDTO;
import com.project.backend.entity.Reser;
import com.project.backend.service.ReserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
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
    public ResponseEntity<?> createReser(@RequestBody ReserRequestDTO reserRequestDTO) {
        return reserService.createReser(reserRequestDTO);
    }

    // 전체 예약 가져오기
    @GetMapping("/api/reser/all")
    public ResponseEntity<List<ReserResponseDTO>> readReserAll() {
        return reserService.readReserAll();
    }

    @GetMapping("/api/reser/select/{id}")
    public ResponseEntity<ReserResponseDTO> readReserById(@PathVariable Long id) {
        return reserService.readReserById(id);
    }

    // 현재 사용자 예약 가져오기
    @GetMapping("/api/reser/user")
    public ResponseEntity<List<ReserResponseDTO>> readReserUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        String email = userDetails.getEmail();
        return reserService.readReserUser(email);
    }

    // 진행 중인 예약 가져오기
    @GetMapping("/api/reser/after")
    public ResponseEntity<List<ReserResponseDTO>> readReserAfter() {
        return reserService.readReserNowAfter();
    }
    // 완료된 예약 가져오기
    @GetMapping("/api/reser/before")
    public ResponseEntity<List<ReserResponseDTO>> readReserBefore() {
        return reserService.readReserNowBefore();
    }

    @GetMapping("/api/reser/time")
    public ResponseEntity<List<Double>> readReserTime(
            @RequestParam("roomId")
            Long roomId,

            @RequestParam("reserDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate reserDate
    ) {
        return reserService.readTimeByReserDate(roomId, reserDate);
    }

    // 수정
    @PatchMapping("/api/reser/update")
    public ResponseEntity<Reser> updateRoom(@RequestBody ReserRequestDTO reserRequestDTO) {
        return reserService.updateReser(reserRequestDTO);
    }
}
