package com.project.backend.controller;

import com.project.backend.entity.CustomUserDetails;
import com.project.backend.entity.DTO.UserDTO;
import com.project.backend.entity.User;
import com.project.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 생성
    @PostMapping("/api/user/create")
    public ResponseEntity<User> createRoom(@RequestBody UserDTO userDTO) {
        return userService.saveUser(userDTO);
    }

    // 읽기
    @GetMapping("/api/user/select")
    public ResponseEntity<User> getUser() {
        CustomUserDetails userDetails =
                (CustomUserDetails) SecurityContextHolder
                        .getContext().getAuthentication().getPrincipal();

        return userService.readUser(userDetails.getEmail());
    }

    // 로그인 여부, 권한 확인
    @GetMapping("/api/user/info")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal CustomUserDetails  userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 필요");
        }

        // 예시: username, authorities(role) 보내기
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("message", true);
        userInfo.put("username", userDetails.getUsername());
        userInfo.put("email", userDetails.getEmail());
        userInfo.put("role", userDetails.getRole());

        return ResponseEntity.ok(userInfo);
    }

    // 수정
    @PatchMapping("/api/user/update")
    public ResponseEntity<User> updateUser(@RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO);
    }

    // 삭제
    @DeleteMapping("/api/user/delete")
    public ResponseEntity<User> deleteUser() {
        CustomUserDetails userDetails =
                (CustomUserDetails) SecurityContextHolder
                        .getContext().getAuthentication().getPrincipal();

        return userService.deleteUser(userDetails.getEmail());
    }
}
