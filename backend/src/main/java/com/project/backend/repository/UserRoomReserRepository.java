package com.project.backend.repository;

import com.project.backend.entity.UserRoomReser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRoomReserRepository extends JpaRepository<UserRoomReser,Integer> {
    public UserRoomReser findById(Long id);
}
