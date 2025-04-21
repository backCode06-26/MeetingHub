package com.project.backend.service;

import com.project.backend.entity.CustomUserDetails;
import com.project.backend.entity.DTO.UserDTO;
import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 사용자 생성
    public ResponseEntity<User> saveUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).
                body(userRepository.save(userDTO.toEntity(passwordEncoder)));
    }

    // 사용자 조회
    public ResponseEntity<User> readUser(String email) {
        if(userRepository.findByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(userRepository.findByEmail(email));
        }
        return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 사용자 수정
    public ResponseEntity<User> updateUser(UserDTO userDTO) {
        if(userRepository.findByEmail(userDTO.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(userRepository.save(userDTO.toEntity(passwordEncoder)));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // 사용자 삭제
    public ResponseEntity<User> deleteUser(String email) {
        User user = userRepository.findByEmail(email);
        if(userRepository.findByEmail(email) != null) {
            userRepository.delete(user);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
