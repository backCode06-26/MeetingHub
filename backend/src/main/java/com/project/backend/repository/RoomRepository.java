package com.project.backend.repository;

import com.project.backend.entity.DTO.RoomDTO;
import com.project.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    public Room findById(Long id);
}
