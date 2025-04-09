package com.project.backend.service;

import com.project.backend.entity.DTO.UserRoomReserDTO;
import com.project.backend.entity.Room;
import com.project.backend.entity.User;
import com.project.backend.entity.UserRoomReser;
import com.project.backend.repository.RoomRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.UserRoomReserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoomReserService {

    private final UserRoomReserRepository userRoomReserRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserRoomReserService(UserRoomReserRepository userRoomReserRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.userRoomReserRepository = userRoomReserRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }


    // 생성
    public ResponseEntity<UserRoomReser> createUserRoomReser(UserRoomReserDTO userRoomReserDTO) {
        if(userRoomReserRepository.findById(userRoomReserDTO.getId()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .build();
        }
        User user = userRepository.findByEmail(userRoomReserDTO.getEmail());
        Room room = roomRepository.findById(userRoomReserDTO.getId());
        return ResponseEntity.status(HttpStatus.OK)
                .body(userRoomReserRepository.save(userRoomReserDTO.toEntity(user, room)));
    }

    // 읽기
    public ResponseEntity<List<UserRoomReser>> readUserRoomReser() {
        List<UserRoomReser> userRoomReserList = userRoomReserRepository.findAll();
        if(userRoomReserList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserList);
    }

    // 수정
    public ResponseEntity<UserRoomReser> updateUserRoomReser(UserRoomReserDTO userRoomReserDTO) {
        if(userRoomReserRepository.findById(userRoomReserDTO.getId()) != null) {
            UserRoomReser userRoomReser = userRoomReserRepository.findById(userRoomReserDTO.getId());
            return ResponseEntity.status(HttpStatus.OK).body(userRoomReser);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
