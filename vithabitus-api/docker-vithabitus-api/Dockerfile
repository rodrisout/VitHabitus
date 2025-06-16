# Imagen base ligera con Java 21
FROM openjdk:21-jdk-slim

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar el JAR al contenedor
COPY api-VitHabitus_1.0.0.jar app.jar

# Puerto que expone Spring Boot por defecto
EXPOSE 8080

# Comando que se ejecuta al iniciar el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]