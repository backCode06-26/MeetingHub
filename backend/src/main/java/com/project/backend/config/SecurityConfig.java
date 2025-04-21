package com.project.backend.config;

import com.project.backend.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.io.PrintWriter;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final CustomAuthenticationFailureHandler authenticationFailureHandler;

    @Bean
    SecurityFilterChain customSecurityFilterChain(HttpSecurity http) throws Exception {
        // 다른 포트의 정보를 요청하기 위한 코드
        http.cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Collections.singletonList("http://localhost:5179"));
                config.setAllowedMethods(Collections.singletonList("*"));
                config.setAllowCredentials(true);
                config.setAllowedHeaders(Collections.singletonList("*"));
                config.setMaxAge(3600L);
                return config;
            }
        })).csrf(AbstractHttpConfigurer::disable)

                // 로그인을 하기 위한 코드
                .formLogin((form) -> form
                        // spring security에서 사용자의 정보를 인식할 때 사용하는 정보의 이름
                        .usernameParameter("email")
                        // spring security에서 로그인을 처리하는 경로, 일반적으로 username(유일한 값), password를 보냄
                        .loginProcessingUrl("/api/loginProc")
                        // 예시 /api/loginProc?useranme=hojin&password=1234
                        // 데이터는 컨트롤러에서 객체를 통해서 받음

                        // 로그인이 완료되었을때 어떤 형식으로 값을 받을 것인지 지정하는 코드
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.setContentType("application/json");
                            response.setCharacterEncoding("UTF-8");

                            PrintWriter out = response.getWriter();
                            out.println("{\"message\":\"success\",\"role\":\"ROLE_USER\"}");
                        })
                        .failureHandler(authenticationFailureHandler)
                )
                .userDetailsService(userDetailsService)
                .logout((logout) -> logout
                        .logoutUrl("/api/logout")                  // 로그아웃 요청 경로 지정
//                        .logoutSuccessHandler((request, response, authentication) -> {
//                            response.setStatus(HttpServletResponse.SC_OK);
//                            response.setContentType("application/json");
//                            response.setCharacterEncoding("UTF-8");
//                            PrintWriter out = response.getWriter();
//                            out.println("{\"message\":\"logout success\"}");
//                            out.flush();
//                        })
                )
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
