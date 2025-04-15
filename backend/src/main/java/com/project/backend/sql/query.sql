-- 테이블 삭제
DROP TABLE IF EXISTS USER_ROOM_RESER;
DROP TABLE IF EXISTS ROOMS;
DROP TABLE IF EXISTS USERS;

-- 테이블 생성
CREATE TABLE USERS (
                       EMAIL VARCHAR(255) PRIMARY KEY,
                       USERNAME VARCHAR(30) NOT NULL,
                       PASSWORD VARCHAR(255) NOT NULL,
                       ROLE VARCHAR(30) DEFAULT 'ROLE_USER'
);

CREATE TABLE ROOMS (
                       ID BIGINT PRIMARY KEY AUTO_INCREMENT,
                       ROOM_NAME VARCHAR(30) NOT NULL
);

CREATE TABLE USER_ROOM_RESER (
                                 ID INT PRIMARY KEY AUTO_INCREMENT,
                                 USER_ID VARCHAR(255) NOT NULL,
                                 ROOM_ID BIGINT NOT NULL,
                                 RESER_DATE TIMESTAMP NOT NULL,
                                 USE_TIME TIMESTAMP NOT NULL,
                                 FOREIGN KEY (USER_ID) REFERENCES USERS(EMAIL),
                                 FOREIGN KEY (ROOM_ID) REFERENCES ROOMS(ID)
);

-- 사용자 정보 추가
INSERT INTO USERS (EMAIL, USERNAME, PASSWORD, ROLE) VALUES
                                                        ('user@example.com', 'user', '$2a$12$mNETO7neFVdLaVrECmTJBua7fzMmvDG3V1LnkOSEsmZV/8neZrvgO', 'ROLE_USER'),
                                                        ('admin@example.com', 'admin', '$2a$12$mNETO7neFVdLaVrECmTJBua7fzMmvDG3V1LnkOSEsmZV/8neZrvgO', 'ROLE_ADMIN');

-- 회의실 정보 추가
INSERT INTO ROOMS (ROOM_NAME) VALUES
                                  ('회의실 A'),
                                  ('회의실 B'),
                                  ('회의실 C'),
                                  ('회의실 D'),
                                  ('회의실 E');

-- 예약 정보 추가
INSERT INTO USER_ROOM_RESER (USER_ID, ROOM_ID, RESER_DATE, USE_TIME) VALUES
                                                                         ('user@example.com', 1, '2025-04-16 09:00:00', '2025-04-16 10:00:00'),
                                                                         ('user@example.com', 2, '2025-04-16 11:00:00', '2025-04-16 12:30:00'),
                                                                         ('admin@example.com', 3, '2025-04-17 14:00:00', '2025-04-17 16:00:00'),
                                                                         ('user@example.com', 4, '2025-04-18 10:30:00', '2025-04-18 11:30:00'),
                                                                         ('admin@example.com', 5, '2025-04-19 15:00:00', '2025-04-19 16:30:00');