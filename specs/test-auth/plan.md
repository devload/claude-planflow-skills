# test-auth

JWT-based authentication system implementation

## Summary

Implement a complete JWT authentication system for a Node.js/Express application. The system includes user registration and login, access/refresh token flow, authentication middleware for protected routes, and secure password management using bcrypt.

## Technical Context

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| JWT Library | jsonwebtoken |
| Password Hashing | bcrypt |
| Validation | zod |
| Testing | Jest, Supertest |

## Project Structure

```
src/
├── index.ts                    # Express server entry point
├── config/
│   └── index.ts               # Environment configuration
├── services/
│   ├── auth.service.ts        # Authentication business logic
│   ├── token.service.ts       # JWT token operations
│   └── password.service.ts    # Password hashing utilities
├── middleware/
│   └── auth.middleware.ts     # Route protection middleware
├── routes/
│   └── auth.routes.ts         # Auth endpoints (/register, /login, /refresh, /logout)
├── validators/
│   └── auth.validator.ts      # Input validation schemas (zod)
└── types/
    └── index.ts               # TypeScript type definitions

prisma/
└── schema.prisma              # Database schema (User, RefreshToken models)

tests/
└── auth.test.ts               # Authentication tests
```

## Key Design Decisions

1. **Dual Token Strategy**: Access tokens (15min) for API access, refresh tokens (7 days) for obtaining new access tokens
2. **Database-stored Refresh Tokens**: Enables token revocation and single-device logout
3. **bcrypt Password Hashing**: Industry standard with automatic salting
4. **Middleware-based Protection**: Reusable auth middleware for any protected route

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@localhost:5432/db |
| JWT_SECRET | Access token signing secret | random-32-char-string |
| JWT_REFRESH_SECRET | Refresh token signing secret | another-random-string |
| ACCESS_TOKEN_EXPIRY | Access token TTL | 15m |
| REFRESH_TOKEN_EXPIRY | Refresh token TTL | 7d |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Create new user account | No |
| POST | /auth/login | Authenticate and get tokens | No |
| POST | /auth/refresh | Get new access token | Refresh Token |
| POST | /auth/logout | Invalidate refresh token | Access Token |
| GET | /auth/me | Get current user info | Access Token |
