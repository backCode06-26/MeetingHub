package com.project.backend.repository;

import com.project.backend.entity.Reser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;


@Repository
public interface ReserRepository extends JpaRepository<Reser, Integer> {
    Reser findById(Long id);

    // 특정 회의실의 예약된 시간 범위를 모두 출력하는 메서드
    List<Reser> findByRoomId(Long id);

    // 특정 사용자의 예약을 가져옵니다.
    List<Reser> findByUserEmailOrderByReserDateDesc(String email);

    // 완료된 예약
    List<Reser> findByReserDateBeforeOrderByReserDateDesc(LocalDate reserDate);

    // 진행 중인 예약
    List<Reser> findByReserDateGreaterThanEqualOrderByReserDateDesc(LocalDate nowDate);

    void deleteByRoomId(Long roomId);

    @Query("""
                SELECT t.time
                FROM Timeslot t
                WHERE t.time NOT IN (
                    SELECT ts.time
                    FROM Timeslot ts JOIN Reser r
                    ON ts.time >= r.startDate AND ts.time < r.endDate
                    WHERE r.room.id = :targetId AND r.reserDate = :targetDate
                )
            """)
    List<Double> findAvailableTimes(@Param("targetId") Long targetId, @Param("targetDate") LocalDate targetDate);


}
