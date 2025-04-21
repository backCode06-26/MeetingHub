package com.project.backend.repository;

import com.project.backend.entity.DTO.ReserResponseDTO;
import com.project.backend.entity.Reser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReserRepository extends JpaRepository<Reser, Integer> {
    Reser findById(Long id);

    @Query(value = "SELECT urr.ID as id, u.USERNAME as username, r.ROOM_NAME as roomName, " +
            "urr.RESER_DATE as reserDate, urr.USE_TIME as useTime " +
            "FROM USER_ROOM_RESER urr " +
            "JOIN USERS u ON urr.USER_ID = u.EMAIL " +
            "JOIN ROOMS r ON urr.ROOM_ID = r.ID " +
            "ORDER BY urr.ID", nativeQuery = true)
    List<ReserResponseDTO> findAllWithJoin();

    // 특정 회의실의 예약된 시간 범위를 모두 출력하는 메서드
    List<Reser> findByRoomId(Long id);

    void deleteByRoomId(Long roomId);
}
