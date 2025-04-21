package com.project.backend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());

        // 로그인 실패 시 메시지 설정
        String errorMessage = "아이디나 비밀번호가 잘못되었습니다.";
        if (exception.getMessage().equalsIgnoreCase("Bad credentials")) {
            errorMessage = "아이디나 비밀번호가 잘못되었습니다.";
        }

        response.getWriter().write(errorMessage);
    }
}
