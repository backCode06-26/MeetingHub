package com.project.backend.repository;

import com.project.backend.entity.Reser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface ReserRepository extends JpaRepository<Reser, Integer> {
    Reser findById(Long id);

    // 특정 회의실의 예약된 시간 범위를 모두 출력하는 메서드
    List<Reser> findByRoomId(Long id);
    // 특정 사용자의 예약을 가져옵니다.
    List<Reser> findByUserEmail(String email);

    // 현재 시간을 지난 예약
    List<Reser> findByUseTimeBefore(Timestamp nowDate);
    // 현재 시간 전인 예약
    List<Reser> findByReserDateAfter(Timestamp nowDate);

    void deleteByRoomId(Long roomId);
}
