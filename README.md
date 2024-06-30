# CRM Backend Application

## Overview

This is a CRM backend application built with **Node.js**, **Express**, and **TypeScript**. The application includes user **registration**, **login**, and **user management** features. It uses JWT for authentication and bcrypt for password hashing.

## Features

- User registration
- User login
- Fetch user details
- Fetch all users
- JWT-based authentication
- Passport.js integration for authentication

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    cd CRM_BACKEND
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables. Create a **.env** and **db.ts** file in config folder


## Running the Application

1. Start the development server:

    ```bash
    npm run start:dev
    ```

2. The server will be running on **port** you specified.


## API Endpoints

1. User Registration

    - URL: /api/register
    - Method: POST
    - Body:
    ```bash
        {
            "fullName": "John Doe",
            "email": "john.doe@example.com",
            "password": "password123"
        }
    ```

2. User Login

    - URL: /api/login
    - Method: POST
    - Body:
    ```bash
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
    ```

3. Fetch Current User

    - URL: /api/users/me
    - Method: GET
    - Headers: Authorization: Bearer <jwt_token>

4. Fetch All Users

    - URL: /api/users
    - Method: GET


## Testing
Run unit tests using Jest:

    ``` bash
    npm test
    ```

## Configuration

### Database Configuration

Configure the database connection in config/db.ts.

## Passport Configuration

Configure passport strategies in src/middlewares/passport-config.ts.

## Code Overview

### index.ts

- The main entry point of the application. Sets up the Express server, middlewares, routes, and database connection.

### src/apis/index.ts

- Defines the API routes and associates them with their respective controllers.

### src/controllers

- Contains the business logic for handling requests and interacting with the database.

    - Auth/index.ts: Handles user registration and login.
    - User/index.ts: Handles fetching user details and list of users.
    - src/middlewares/passport-config.ts
    - Configures Passport.js for JWT authentication.

### src/models

- Defines the database models using TypeORM.

### src/validators
- Contains validation logic for request data.

## Dependencies

    - Express
    - TypeScript
    - dotenv
    - body-parser
    - cors
    - bcryptjs
    - jsonwebtoken
    - passport
    - passport-jwt
    - typeorm
    - jest
    

# License
This project is licensed under the SBG License.
