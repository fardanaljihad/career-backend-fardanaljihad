# Project User API and Search API

This project provides the following functionalities:

1. **Endpoint Login**

2. **Endpoint CRUD User**

3. **Endpoint Search** → Endpoint search data that retrieves data from [https://bit.ly/48ejMhW](https://bit.ly/48ejMhW).

4. **Authentication**

## Prerequisites
This project uses the following versions:
- **Node.js**: v22.12.0  
- **npm**: v10.9.0  
- **MySQL**: v8  

---

## Package Dependencies
This project uses the following main packages:

- **[express](https://www.npmjs.com/package/express)** → Minimalist framework for building REST APIs.  
- **[joi](https://www.npmjs.com/package/joi)** → Input data validation to ensure safety and consistency.  
- **[winston](https://www.npmjs.com/package/winston)** → Logger for tracking application activities and errors.  
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** → Secure password hashing and encryption.  
- **[uuid](https://www.npmjs.com/package/uuid)** → Generate unique identifiers (UUID) for data like user IDs.  

---

## Dev Dependencies
This project uses the following development and testing packages:

- **[@types/express](https://www.npmjs.com/package/@types/express)** → Type definitions for Express.  
- **[prisma](https://www.npmjs.com/package/prisma)** → ORM for managing the database easily.  
- **[@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt)** → Type definitions for bcrypt.  
- **[@types/uuid](https://www.npmjs.com/package/@types/uuid)** → Type definitions for uuid.  
- **[jest](https://www.npmjs.com/package/jest)** → Testing framework for unit tests.  
- **[@types/jest](https://www.npmjs.com/package/@types/jest)** → Type definitions for Jest.  
- **[babel-jest](https://www.npmjs.com/package/babel-jest)** → Integrates Babel with Jest to test modern JS code.  
- **[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)** → Babel preset to compile modern JavaScript into compatible versions.  
- **[supertest](https://www.npmjs.com/package/supertest)** → HTTP assertions for testing APIs.  
- **[@types/supertest](https://www.npmjs.com/package/@types/supertest)** → Type definitions for supertest. 

---

# User API Specifications

## Register User API

Endpoint: POST /api/users

Request Body:
```json
{
    "name": "Test User",
    "username": "test-user",
    "password": "password"
}
```

Response Body Success:
```json
{
    "data": {
        "name": "Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username already registered"
}
```

## Login User API

Endpoint: POST /api/users/login

Request Body:
```json
{
    "username": "test-user",
    "password": "password"
}
```

Response Body Success:
```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:
```json
{
    "errors": "Username or password is wrong"
}
```

## Update User API

Endpoint: PATCH /api/users/current

Headers:
- Authorization: token

Request Body:
```json
{
    "name": "New Test User", // optional
    "password": "new-password" // optional
}
```

Response Body Success:
```json
{
    "data": {
        "name": "New Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": {
        "name": "New Test User",
        "username": "test-user"
    }
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```

## Delete User API

Endpoint: DELETE /api/users/:id

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": "OK"
}
```

Response Body Error:
```json
{
    "errors": "Unauthorized"
}
```