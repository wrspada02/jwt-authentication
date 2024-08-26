# JWT Authentication

## Overview
A project to train the main strategy to authenticate an user with JWT (JSON web token) and guarantee their privilegies to the private resources.
<img src="https://miro.medium.com/v2/resize:fit:1400/1*kZZ2hiPrsb5_DTgVETcXyQ.gif" alt="JWT postman proccess" />

## How to run
1. Build the docker image `docker buildx build -t jwt-authentication .`.
2. Run image docker `docker run -p 3000:3000 jwt-authentication:latest`.
3. Send a request.

## Swagger API Documentation
1. Be sure you have the swagger.yml file defined with the necessary data.
2. Run `docker run -p 80:8080 -e SWAGGER_JSON=/app/swagger.yml -v $(pwd):/app swaggerapi/swagger-ui`.

## Technologies
Docker, Nest.js, JWT.
