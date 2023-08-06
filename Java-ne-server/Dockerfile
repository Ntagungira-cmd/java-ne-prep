# Use the official OpenJDK 17 image as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

ARG JAR_FILE=target/*.jar
# Copy the Spring Boot JAR file into the container
COPY $JAR_FILE /app/java-ne.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Command to run your Spring Boot application
CMD ["java", "-jar", "java-ne.jar"]
