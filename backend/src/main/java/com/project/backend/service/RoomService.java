package com.project.backend.service;

import com.project.backend.entity.DTO.RoomDTO;
import com.project.backend.entity.Room;
import com.project.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // 회의실 생성
    public ResponseEntity<Room> createRoom(RoomDTO roomDTO) {
        if(roomRepository.findById(roomDTO.getId()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return  ResponseEntity.status(HttpStatus.OK)
                .body(roomRepository.save(roomDTO.toEntity()));
    }

    // 회의실 수정
    public ResponseEntity<Room> updateRoom(RoomDTO roomDTO) {
        if(roomRepository.findById(roomDTO.getId()) != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(roomRepository.save(roomDTO.toEntity()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 회의실 삭제
    public ResponseEntity<Room> deleteRoom(Long id) {
        if(roomRepository.findById(id) != null) {

            Room room = roomRepository.findById(id);
            roomRepository.delete(room);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
