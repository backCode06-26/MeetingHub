package com.project.backend.service;

import com.project.backend.entity.DTO.ReserRequestDTO;
import com.project.backend.entity.DTO.ReserResponseDTO;
import com.project.backend.entity.Room;
import com.project.backend.entity.User;
import com.project.backend.entity.Reser;
import com.project.backend.repository.RoomRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.repository.ReserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReserService {

    private final ReserRepository reserRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReserService(ReserRepository reserRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.reserRepository = reserRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }


    // 생성
    public ResponseEntity<Reser> createUserRoomReser(ReserRequestDTO reserRequestDTO) {
        try {
            User user = userRepository.findByEmail(reserRequestDTO.getEmail());
            Room room = roomRepository.findById(reserRequestDTO.getRoomId());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(reserRepository.save(reserRequestDTO.toEntity(user, room)));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    // 읽기
    public ResponseEntity<List<ReserResponseDTO>> readUserRoomReser() {
        List<ReserResponseDTO> userRoomReserList = reserRepository.findAllWithJoin();
        if(userRoomReserList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserList);
    }

    // 수정
    public ResponseEntity<Reser> updateUserRoomReser(ReserRequestDTO reserRequestDTO) {
        if(reserRepository.findById(reserRequestDTO.getId()) != null) {
            Reser reser = reserRepository.findById(reserRequestDTO.getId());
            reser.setReserDate(reserRequestDTO.getReserDate());
            reser.setUseTime(reserRequestDTO.getUseTime());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(reserRepository.save(reser));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}
