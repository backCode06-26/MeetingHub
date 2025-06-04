# 1. 빌드용 이미지 (Maven + JDK 17)
FROM maven:3.9.4-eclipse-temurin-17 AS build

WORKDIR /app

# pom.xml과 소스코드 복사
COPY pom.xml .
COPY src ./src

# 빌드 실행 (package 단계)
RUN mvn clean package -DskipTests

# 2. 실행용 이미지 (JRE 17)
FROM eclipse-temurin:17-jre

WORKDIR /app

# 빌드된 jar 파일 복사 (경로 target/backend-0.0.1-SNAPSHOT.jar)
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar ./app.jar

# 컨테이너 실행 시 java -jar 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
