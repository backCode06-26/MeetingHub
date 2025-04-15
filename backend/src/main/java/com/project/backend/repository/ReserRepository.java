package com.project.backend.repository;

import com.project.backend.entity.Reser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ReserRepository extends JpaRepository<Reser,Integer> {
    Reser findById(Long id);

    @Query(value = "SELECT urr.ID, u.USERNAME, r.ROOM_NAME, urr.RESER_DATE, urr.USE_TIME " +
            "FROM USER_ROOM_RESER urr " +
            "JOIN USERS u on urr.USER_ID = u.EMAIL " +
            "JOIN ROOMS r on urr.ROOM_ID = r.ID " +
            "ORDER BY urr.ID", nativeQuery = true)
    List<Reser> findAll();
}
