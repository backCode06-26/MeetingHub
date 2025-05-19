package com.project.backend.service;

import com.project.backend.entity.DTO.RoomDTO;
import com.project.backend.entity.Room;
import com.project.backend.repository.ReserRepository;
import com.project.backend.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ReserRepository reserRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, ReserRepository reserRepository) {
        this.roomRepository = roomRepository;
        this.reserRepository = reserRepository;
    }

    // 회의실 생성
    public ResponseEntity<Room> createRoom(RoomDTO roomDTO) {
        if (roomRepository.findById(roomDTO.getId()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(roomRepository.save(roomDTO.toEntity()));
    }

    // 회의실 일기
    public ResponseEntity<List<RoomDTO>> readRoom() {
        List<RoomDTO> rooms = roomRepository.findAll().stream().map(Room::toDTO).toList();
        if (rooms.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(rooms);
    }

    // 회의실 수정
    public ResponseEntity<Room> updateRoom(RoomDTO roomDTO) {
        if (roomRepository.findById(roomDTO.getId()) != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(roomRepository.save(roomDTO.toEntity()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 회의실 삭제
    @Transactional
    public ResponseEntity<List<RoomDTO>> deleteRoom(Long id) {
        if (roomRepository.existsById(id)) {

            // 해당 회의실에 대한 예약 먼저 삭제
            reserRepository.deleteByRoomId(id);

            // 회의실 삭제
            roomRepository.deleteById(id);

            // 전체 회의실 목록 반환
            List<RoomDTO> rooms = roomRepository.findAll()
                    .stream()
                    .map(Room::toDTO)
                    .toList();

            return ResponseEntity.ok(rooms);
        }

        return ResponseEntity.badRequest().build();
    }
}
