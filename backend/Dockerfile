FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build


FROM openjdk:17-jdk-slim

WORKDIR /app

COPY backend/target/your-backend-app.jar app.jar

COPY --from=frontend-builder /app/frontend/dist BOOT-INF/classes/static/

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]