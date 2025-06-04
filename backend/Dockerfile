# Java 17 JDK 기반 이미지
FROM eclipse-temurin:17-jdk-alpine

# 작업 디렉토리 설정
WORKDIR /app

# JAR 파일 복사
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# 포트 열기 (Spring Boot 기본)
EXPOSE 8080

# 앱 실행 명령어
CMD ["java", "-jar", "app.jar"]