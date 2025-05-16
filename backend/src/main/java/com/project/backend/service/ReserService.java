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

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<?> createUserRoomReser(ReserRequestDTO reserRequestDTO) {
        try {
            // 요청된 시작/끝 시간
            Timestamp newStart = reserRequestDTO.getReserDate();
            Timestamp newEnd = reserRequestDTO.getUseTime();

            // 기존 예약 전부 조회
            List<Reser> existingReser = reserRepository.findByRoomId(reserRequestDTO.getRoomId());

            // 시간 겹침 체크
            for (Reser reser : existingReser) {
                Timestamp existingStart = reser.getReserDate();
                Timestamp existingEnd = reser.getUseTime();
                System.out.println(existingStart);
                System.out.println(existingEnd);

                boolean isOverlap = existingEnd.before(newStart) || newEnd.before(existingStart);
                if (isOverlap) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("기존의 예약과 시간이 겁칩니다.");
                }
            }

            // 사용자와 회의실 조회
            User user = userRepository.findByEmail(reserRequestDTO.getEmail());
            Room room = roomRepository.findById(reserRequestDTO.getRoomId());

            // 예약 저장
            Reser newReser = reserRequestDTO.toEntity(user, room);
            Reser saved = reserRepository.save(newReser);

            return ResponseEntity.status(HttpStatus.OK).body(saved);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // 읽기
    public ResponseEntity<List<ReserResponseDTO>> readUserRoomReser() {
        List<ReserResponseDTO> userRoomReserList = reserRepository.findAll().stream().map(Reser::toDTO).toList();
        if(userRoomReserList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserList);
    }

    // 현재 사용자의 예약 가져오기
    public ResponseEntity<List<ReserResponseDTO>> readUserReserByEmail(String email) {
        List<ReserResponseDTO> userRoomReserList = reserRepository.findByUserEmail(email).stream().map(Reser::toDTO).toList();
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
