package com.project.backend.repository;

import com.project.backend.entity.UserRoomReser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRoomReserRepository extends JpaRepository<UserRoomReser,Integer> {
}
