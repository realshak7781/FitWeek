# --- STAGE 1: Build the Application ---
# Switch to a reliable Maven image with Java 17
FROM maven:3.8.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the fat JAR
COPY src ./src
RUN mvn package -DskipTests

# --- STAGE 2: Run the Application ---
# Switch from the deprecated 'openjdk' to 'eclipse-temurin'
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy only the compiled JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (standard for Spring Boot)
EXPOSE 8080

# Run the app with optimized memory settings for the cloud
ENTRYPOINT ["java", "-jar", "app.jar"]