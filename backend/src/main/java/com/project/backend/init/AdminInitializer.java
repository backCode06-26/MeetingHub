package com.project.backend.init;

import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // admin 계정이 이미 있지 않으면 생성
        if (userRepository.findByEmail("admin@admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@admin");
            admin.setPassword(passwordEncoder.encode("1234"));  // 비밀번호는 암호화
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("✅ admin 계정이 초기화되었습니다.");
        } else {
            System.out.println("ℹ️ admin 계정이 이미 존재합니다.");
        }
    }
}
