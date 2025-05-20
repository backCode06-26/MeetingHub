package com.project.backend.repository;

import com.project.backend.entity.Reser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface ReserRepository extends JpaRepository<Reser, Integer> {
    Reser findById(Long id);

    // 특정 회의실의 예약된 시간 범위를 모두 출력하는 메서드
    List<Reser> findByRoomId(Long id);
    // 특정 사용자의 예약을 가져옵니다.
    List<Reser> findByUserEmailOrderByReserDateDesc(String email);

    // 완료된 예약
    List<Reser> findByReserDateBeforeOrderByReserDateDesc(Timestamp nowDate);
    // 진행 중인 예약
    List<Reser> findByReserDateAfterOrderByReserDateDesc(Timestamp nowDate);

    void deleteByRoomId(Long roomId);

    @Query(value = "SELECT T.TIME " +
            "FROM TIMESLOTS T " +
            "WHERE T.TIME NOT IN ( " +
            "    SELECT TS.TIME " +
            "    FROM RESERS R " +
            "    JOIN TIMESLOTS TS ON TS.TIME >= R.START_DATE AND TS.TIME < R.END_DATE " +
            "    WHERE R.RESER_DATE = STR_TO_DATE(:selectDate, '%Y-%m-%d') " +
            ")", nativeQuery = true)
    List<Double> findTimeByReserDate(@Param("selectDate") String selectDate);
}
