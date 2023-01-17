FROM openjdk:11-jdk
COPY . /app
WORKDIR /app
RUN apt-get update && apt-get install -y maven
CMD mvn spring-boot:run
