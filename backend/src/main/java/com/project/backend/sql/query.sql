-- 테이블 삭제
DROP TABLE IF EXISTS RESERS;
DROP TABLE IF EXISTS ROOMS;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS TIMESLOTS;

-- 테이블 생성
CREATE TABLE USERS
(
    EMAIL    VARCHAR(255) PRIMARY KEY,
    USERNAME VARCHAR(30)  NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    ROLE     VARCHAR(30) DEFAULT 'ROLE_USER'
);

CREATE TABLE ROOMS
(
    ID        BIGINT PRIMARY KEY AUTO_INCREMENT,
    ROOM_NAME VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE RESERS
(
    ID         INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID    VARCHAR(255) NOT NULL,
    ROOM_ID    BIGINT       NOT NULL,
    RESER_DATE DATE         NOT NULL,      -- 날짜만 필요하므로 DATE로 변경
    START_DATE FLOAT        NOT NULL,      -- 시간으로 의미 명확히 하기 위해 컬럼명 변경 및 FLOAT 타입
    END_DATE   FLOAT        NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USERS (EMAIL),
    FOREIGN KEY (ROOM_ID) REFERENCES ROOMS (ID)
);

CREATE TABLE TIMESLOTS
(
    TIME FLOAT PRIMARY KEY
);

-- 사용자 정보 추가
INSERT INTO USERS (EMAIL, USERNAME, PASSWORD, ROLE)
VALUES ('user@example.com', 'user', '$2a$12$mNETO7neFVdLaVrECmTJBua7fzMmvDG3V1LnkOSEsmZV/8neZrvgO', 'ROLE_USER'),
       ('admin@example.com', 'admin', '$2a$12$mNETO7neFVdLaVrECmTJBua7fzMmvDG3V1LnkOSEsmZV/8neZrvgO', 'ROLE_ADMIN');

-- 회의실 정보 추가 (ID 자동증가 옵션 고려 시 ID 생략 가능)
INSERT INTO ROOMS (ID, ROOM_NAME)
VALUES (1,'회의실 A'),
       (2,'회의실 B'),
       (3,'회의실 C'),
       (4,'회의실 D'),
       (5,'회의실 E');

-- 예약 정보 추가 (ROOM_ID는 1~5만 사용)
INSERT INTO RESERS (USER_ID, ROOM_ID, RESER_DATE, START_DATE, END_DATE)
VALUES ('user@example.com', 1, '2025-04-16', 10.0, 11.0),
       ('user@example.com', 2, '2025-04-16', 12.5, 13.5),
       ('admin@example.com', 3, '2025-04-16', 16.0, 17.0),
       ('user@example.com', 4, '2025-04-18', 10.5, 11.5),
       ('admin@example.com', 5, '2025-04-19', 15.0, 16.5),
       ('user@example.com', 1, '2025-05-20', 14.0, 15.0),
       ('user@example.com', 2, '2025-05-20', 9.0, 10.5),
       ('user@example.com', 3, '2025-05-20', 11.0, 12.0),
       ('user@example.com', 4, '2025-05-20', 16.0, 17.0),
       ('user@example.com', 2, '2025-05-21', 9.5, 11.0),
       ('admin@example.com', 3, '2025-05-22', 13.0, 14.5),
       ('user@example.com', 4, '2025-05-23', 16.0, 17.0);

-- TIMESLOTS 데이터 추가
INSERT INTO TIMESLOTS (TIME)
VALUES (1.0),
       (1.5),
       (2.0),
       (2.5),
       (3.0),
       (3.5),
       (4.0),
       (4.5),
       (5.0),
       (5.5),
       (6.0),
       (6.5),
       (7.0),
       (7.5),
       (8.0),
       (8.5),
       (9.0),
       (9.5),
       (10.0),
       (10.5),
       (11.0),
       (11.5),
       (12.0),
       (12.5),
       (13.0),
       (13.5),
       (14.0),
       (14.5),
       (15.0),
       (15.5),
       (16.0),
       (16.5),
       (17.0),
       (17.5),
       (18.0),
       (18.5),
       (19.0),
       (19.5),
       (20.0),
       (20.5),
       (21.0),
       (21.5),
       (22.0),
       (22.5),
       (23.0),
       (23.5),
       (24.0),
       (24.5);
