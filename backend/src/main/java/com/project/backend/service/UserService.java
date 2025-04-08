package com.project.backend.service;

import com.project.backend.entity.DTO.UserDTO;
import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 생성
    public ResponseEntity<User> userSave(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).
                body(userRepository.save(userDTO.toEntity()));
    }

    // 사용자 조회
    public ResponseEntity<User> userSelect(String email) {
        if(userRepository.findByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.OK).body(userRepository.findByEmail(email));
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 사용자 수정
    public ResponseEntity<User> userUpdate(UserDTO userDTO) {
        if(userRepository.findByEmail(userDTO.getEmail()) != null) {
            User user = userRepository.findByEmail(userDTO.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 사용자 삭제
    public ResponseEntity<User> userDelete(String email) {
        if(userRepository.findByEmail(email) != null) {
            User user = userRepository.findByEmail(email);
            userRepository.delete(user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
