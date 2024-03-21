# Scissor URL Shortener Documentation

## Overview
Scissor URL Shortener is a web application designed to shorten URLs for easy sharing and tracking. It provides users with shortened URLs, QR codes for easy scanning, and analytics to track visit counts and times.

The frontend of the application is built using React and is deployed on [https://scissor-theta.vercel.app/](https://scissor-theta.vercel.app/). The backend is developed with FastAPI, SQLAlchemy for database ORM, and deployed on [https://scissor-326r.onrender.com/](https://scissor-326r.onrender.com/).

## Features

### URL Shortening
Users can submit long URLs to the application, and the system generates a shorter version of the URL, making it easier to share.

### QR Code Generation
For each shortened URL, a QR code is generated, allowing users to easily scan and access the original URL.

### Analytics
The application tracks visit counts for each shortened URL and provides analytics on visit times.

### User Management
Users can register for accounts, log in, and manage their profiles.

## Endpoints

### `GET /`
- **Description**: Homepage of the Scissor URL Shortener application.
- **Response**: JSON object with a welcome message.

### `POST /shorten-url`
- **Description**: Create a shortened URL for the provided original URL.
- **Request Body**: JSON object containing the original URL and user ID.
- **Response**: JSON object with the original URL, shortened URL, QR code image, and user ID.

### `GET /{short_url}`
- **Description**: Redirect to the original URL corresponding to the provided shortened URL.
- **Response**: Redirects to the original URL.

### `GET /get-qr/{short_url}`
- **Description**: Get the QR code corresponding to the provided shortened URL.
- **Response**: PNG image file of the QR code.

### `GET /original-url/{short_url}`
- **Description**: Retrieve the original URL corresponding to the provided shortened URL.
- **Response**: JSON object with the original URL and user ID.

### `GET /analytics/{short_url}`
- **Description**: Get analytics data for the provided shortened URL.
- **Response**: JSON object with original URL, visit times, visit count, and user ID.

### `GET /link-history/{user_id}`
- **Description**: Get the link history for the provided user ID.
- **Response**: JSON array containing details of shortened URLs, visit counts, and times visited.

### `POST /register`
- **Description**: Register a new user.
- **Request Body**: JSON object containing user details (first name, last name, email, password, and password confirmation).
- **Response**: JSON object with user details and access token.

### `POST /login`
- **Description**: Log in an existing user.
- **Request Body**: JSON object containing user email and password.
- **Response**: JSON object with access token and user details.

### `GET /api/users`
- **Description**: Get a list of all users.
- **Response**: JSON array containing user details.

### `GET /api/users/{id}`
- **Description**: Get details of a specific user by ID.
- **Response**: JSON object with user details.

### `PUT /users/{id}`
- **Description**: Edit the profile of a user.
- **Request Body**: JSON object containing updated user details (first name, last name, and email).
- **Response**: JSON object with updated user details.

## Rate Limiting
- Rate limiting is implemented to restrict the number of requests made to certain endpoints within specific time frames to prevent abuse and ensure system stability.

## Error Handling
- The application provides appropriate error responses with detailed error messages to assist users and developers in troubleshooting issues.

## Authentication and Authorization
- Users can register for accounts, log in, and manage their profiles securely. JSON Web Tokens (JWT) are used for authentication, and bcrypt is utilized for password hashing.

## Dependencies
- The application utilizes various Python libraries, including FastAPI, SQLAlchemy, bcrypt, qrcode, cachetools, and passlib, among others.

## Environment
- Environment variables are used to store sensitive information such as secret keys and database URIs, ensuring security and configurability.

## Logging
- Logging is implemented to record application events and errors for monitoring and debugging purposes.

## Caching
- Caching is employed to optimize performance by storing frequently accessed data temporarily in memory.

## Deployment
- The frontend of the application is deployed on Vercel, while the backend is hosted on Render, ensuring reliability and scalability.

## Conclusion
The Scissor URL Shortener provides a convenient solution for shortening URLs, generating QR codes, and tracking analytics. With its user-friendly interface and robust functionality, it offers a seamless experience for both users and developers.
