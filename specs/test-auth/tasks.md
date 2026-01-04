# Tasks: test-auth

## Phase 1: Foundation Setup

### T-1.1: Initialize project with TypeScript configuration
- [ ] Completed
- **Description**: Set up a new Node.js project with TypeScript, ESLint, and necessary build configuration
- **Files**: `package.json`, `tsconfig.json`, `.eslintrc.js`
- **Dependencies**: None
- **Validation**: `npm run build` compiles without errors

### T-1.2: Set up Prisma with PostgreSQL connection
- [ ] Completed
- **Description**: Install Prisma, initialize with PostgreSQL provider, configure database connection
- **Files**: `prisma/schema.prisma`, `.env`, `src/config/index.ts`
- **Dependencies**: T-1.1
- **Validation**: `npx prisma db push` succeeds, connection verified

### T-1.3: Create User and RefreshToken database models
- [ ] Completed
- **Description**: Define Prisma models for User (id, email, password, createdAt) and RefreshToken (id, token, userId, expiresAt, createdAt)
- **Files**: `prisma/schema.prisma`
- **Dependencies**: T-1.2
- **Validation**: `npx prisma generate` creates client, models accessible in code

### T-1.4: Set up Express server with basic middleware
- [ ] Completed
- **Description**: Create Express app with JSON parsing, CORS, error handling middleware, and health check endpoint
- **Files**: `src/index.ts`, `src/middleware/error.middleware.ts`
- **Dependencies**: T-1.1
- **Validation**: Server starts and responds to GET /health

---

## Phase 2: Core Authentication

### T-2.1: Create password hashing utility with bcrypt
- [ ] Completed
- **Description**: Implement hashPassword and comparePassword functions using bcrypt with configurable salt rounds
- **Files**: `src/services/password.service.ts`
- **Dependencies**: T-1.1
- **Validation**: Unit tests pass for hash/compare operations

### T-2.2: Implement user registration endpoint [P]
- [ ] Completed
- **Description**: POST /auth/register - validate input, check email uniqueness, hash password, create user, return success
- **Files**: `src/routes/auth.routes.ts`, `src/services/auth.service.ts`
- **Dependencies**: T-1.3, T-2.1, T-2.5
- **Validation**: Can register new user, duplicate email rejected, password stored hashed

### T-2.3: Implement JWT token generation service [P]
- [ ] Completed
- **Description**: Create functions to generate access tokens (15min) and refresh tokens (7 days), sign with appropriate secrets
- **Files**: `src/services/token.service.ts`
- **Dependencies**: T-1.1
- **Validation**: Generated tokens decode correctly with expected payload and expiry

### T-2.4: Implement user login endpoint
- [ ] Completed
- **Description**: POST /auth/login - validate credentials, generate token pair, store refresh token in DB, return tokens
- **Files**: `src/routes/auth.routes.ts`, `src/services/auth.service.ts`
- **Dependencies**: T-2.2, T-2.3
- **Validation**: Valid credentials return tokens, invalid credentials return 401

### T-2.5: Create input validation schemas with zod [P]
- [ ] Completed
- **Description**: Define validation schemas for registration (email, password) and login requests
- **Files**: `src/validators/auth.validator.ts`
- **Dependencies**: T-1.1
- **Validation**: Invalid inputs rejected with descriptive error messages

---

## Phase 3: Token Management

### T-3.1: Implement authentication middleware
- [ ] Completed
- **Description**: Middleware to extract Bearer token, verify JWT, attach user to request, reject if invalid/expired
- **Files**: `src/middleware/auth.middleware.ts`
- **Dependencies**: T-2.3
- **Validation**: Protected routes reject invalid tokens, valid tokens allow access

### T-3.2: Implement token refresh endpoint
- [ ] Completed
- **Description**: POST /auth/refresh - validate refresh token, check in DB, generate new access token, optionally rotate refresh token
- **Files**: `src/routes/auth.routes.ts`, `src/services/auth.service.ts`
- **Dependencies**: T-2.3, T-2.4
- **Validation**: Valid refresh token returns new access token, expired/invalid rejected

### T-3.3: Implement logout endpoint
- [ ] Completed
- **Description**: POST /auth/logout - require auth, delete refresh token from DB to invalidate session
- **Files**: `src/routes/auth.routes.ts`, `src/services/auth.service.ts`
- **Dependencies**: T-3.1, T-3.2
- **Validation**: After logout, refresh token no longer works

### T-3.4: Add protected route example
- [ ] Completed
- **Description**: GET /auth/me - protected endpoint that returns current user info, demonstrates middleware usage
- **Files**: `src/routes/auth.routes.ts`
- **Dependencies**: T-3.1
- **Validation**: Returns user info with valid token, 401 without token

---

## Phase 4: Testing & Security

### T-4.1: Write unit tests for auth services [P]
- [ ] Completed
- **Description**: Test password.service (hash/compare), token.service (generate/verify), auth.service business logic
- **Files**: `tests/unit/services.test.ts`
- **Dependencies**: T-2.1, T-2.3, T-2.4
- **Validation**: All unit tests pass with >80% coverage on services

### T-4.2: Write integration tests for auth endpoints [P]
- [ ] Completed
- **Description**: Test full flow: register -> login -> access protected route -> refresh -> logout
- **Files**: `tests/integration/auth.test.ts`
- **Dependencies**: T-3.4
- **Validation**: All integration tests pass, edge cases covered

### T-4.3: Add rate limiting to auth endpoints
- [ ] Completed
- **Description**: Apply rate limiting to /register and /login to prevent brute force (e.g., 5 attempts per minute)
- **Files**: `src/middleware/rateLimit.middleware.ts`, `src/routes/auth.routes.ts`
- **Dependencies**: T-2.2, T-2.4
- **Validation**: Requests blocked after limit exceeded, returns 429

### T-4.4: Security review and documentation
- [ ] Completed
- **Description**: Review for OWASP vulnerabilities, add security headers, document API in README
- **Files**: `README.md`, `src/middleware/security.middleware.ts`
- **Dependencies**: T-4.1, T-4.2, T-4.3
- **Validation**: Security checklist complete, API documented

---

## Task Summary

| Phase | Tasks | Parallelizable |
|-------|-------|----------------|
| Phase 1: Foundation Setup | 4 | T-1.2 & T-1.4 after T-1.1 |
| Phase 2: Core Authentication | 5 | T-2.2, T-2.3, T-2.5 |
| Phase 3: Token Management | 4 | Sequential |
| Phase 4: Testing & Security | 4 | T-4.1, T-4.2 |
| **Total** | **17** | |

## Critical Path

```
T-1.1 → T-1.2 → T-1.3 → T-2.2 → T-2.4 → T-3.2 → T-3.3 → T-4.2 → T-4.4
```
