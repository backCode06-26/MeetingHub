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
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    // 현재 시간 생성
    private double currentTime() {
        LocalDateTime now = LocalDateTime.now();
        double hour = now.getHour();
        double minute = now.getMinute() >= 30 ? 0.5 : 0;

        double currentTime = hour + minute;
        return currentTime;
    }


    // 생성
    public ResponseEntity<?> createReser(ReserRequestDTO reserRequestDTO) {

        // 사용자와 회의실 조회
        User user = userRepository.findByEmail(reserRequestDTO.getEmail());
        Room room = roomRepository.findById(reserRequestDTO.getRoomId());

        // 예약 저장
        Reser newReser = reserRequestDTO.toEntity(user, room);
        Reser saved = reserRepository.save(newReser);
        if (saved.getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        ReserResponseDTO data = reserRepository.findById(saved.getId()).toDTO();
        return ResponseEntity.status(HttpStatus.OK).body(data);
    }


    // id로 예약 가져오기
    public ResponseEntity<ReserResponseDTO> readReserById(Long id) {
        Reser reser = reserRepository.findById(id);
        if (reser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(reser.toDTO());
    }


    // 전체 예약 가져오기
    public ResponseEntity<List<ReserResponseDTO>> readReserAll() {
        List<ReserResponseDTO> userRoomReserList =
                reserRepository.findAll(Sort.by(Sort.Direction.DESC, "ReserDate", "StartDate"))
                        .stream()
                        .map(Reser::toDTO)
                        .toList();

        if (userRoomReserList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserList);
    }

    // 현재 사용자의 예약 가져오기
    public ResponseEntity<List<ReserResponseDTO>> readReserUser(String email) {
        List<ReserResponseDTO> userRoomReserList = reserRepository
                .findByUserEmailOrderByReserDateDescStartDateDesc(
                        email
                )
                .stream()
                .map(Reser::toDTO)
                .toList();
        if (userRoomReserList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserList);
    }

    // 진행중인 예약 가져오기
    public ResponseEntity<List<ReserResponseDTO>> readReserNowAfter() {
        double currentTime = currentTime();

        List<ReserResponseDTO> userRoomReserAfterList = reserRepository
                .findByReserDateGreaterThanEqualOrderByReserDateDescStartDateDesc(
                        LocalDate.now(),
                        currentTime
                )
                .stream()
                .map(Reser::toDTO)
                .toList();
        if (userRoomReserAfterList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserAfterList);
    }

    // 완료된 예약 가져오기
    public ResponseEntity<List<ReserResponseDTO>> readReserNowBefore() {
        double currentTime = currentTime();

        List<ReserResponseDTO> userRoomReserBeforeList = reserRepository
                .findByReserDateBeforeOrderByReserDateDescStartDateDesc(
                        LocalDate.now(),
                        currentTime
                )
                .stream()
                .map(Reser::toDTO)
                .toList();
        if (userRoomReserBeforeList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(userRoomReserBeforeList);
    }

    // 예약된 시간 조회
    public ResponseEntity<List<Double>> readTimeByReserDate(Long targetId, LocalDate reserDate) {

        double currentTime = currentTime();

        List<Double> tiems = reserDate.equals(LocalDate.now()) ?
                reserRepository.findAvailableTimes(targetId, reserDate, currentTime) :
                reserRepository.findTimes();

        if (tiems.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(tiems);
    }

    // 수정
    public ResponseEntity<Reser> updateReser(ReserRequestDTO reserRequestDTO) {
        if (reserRepository.findById(reserRequestDTO.getId()) != null) {
            Reser reser = new Reser();
            reser.setId(reserRequestDTO.getId());
            reser.setUser(userRepository.findByEmail(reserRequestDTO.getEmail()));
            reser.setRoom(roomRepository.findById(reserRequestDTO.getRoomId()));
            reser.setReserDate(reserRequestDTO.getReserDate());
            reser.setStartDate(reserRequestDTO.getStartDate());
            reser.setEndDate(reserRequestDTO.getEndDate());

            return ResponseEntity.status(HttpStatus.OK)
                    .body(reserRepository.save(reser));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}