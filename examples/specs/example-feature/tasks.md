# Tasks: example-feature

Generated from: plans/example-feature-20260104-1500.md
Date: 2026-01-04

## Phase 1: Core Authentication Setup

### T-1.1: Create JWT configuration
- **Description**: Set up JWT configuration with secret keys, expiration times, and token options
- **Files**: `src/config/jwt.config.ts`
- **Dependencies**: None
- **Validation**: Config exports accessToken and refreshToken settings

### T-1.2: Implement user repository [P]
- **Description**: Create database queries for user lookup and token storage
- **Files**: `src/users/user.repository.ts`, `prisma/schema.prisma`
- **Dependencies**: None
- **Validation**: Can query users by email and store refresh tokens

### T-1.3: Create auth types
- **Description**: Define TypeScript interfaces for auth requests, responses, and tokens
- **Files**: `src/auth/auth.types.ts`
- **Dependencies**: None
- **Validation**: Types compile without errors

## Phase 2: Authentication Logic

### T-2.1: Implement auth service
- **Description**: Create service with login, logout, and token refresh logic
- **Files**: `src/auth/auth.service.ts`
- **Dependencies**: T-1.1, T-1.2, T-1.3
- **Validation**: Unit tests pass for all auth operations

### T-2.2: Create auth middleware
- **Description**: JWT verification middleware for protected routes
- **Files**: `src/auth/auth.middleware.ts`
- **Dependencies**: T-1.1
- **Validation**: Middleware correctly validates tokens and rejects invalid ones

### T-2.3: Build auth controller
- **Description**: REST endpoints for login, logout, refresh, and me
- **Files**: `src/auth/auth.controller.ts`
- **Dependencies**: T-2.1, T-2.2
- **Validation**: All endpoints return correct responses

## Phase 3: Testing & Integration

### T-3.1: Write unit tests
- **Description**: Test auth service and middleware in isolation
- **Files**: `src/auth/__tests__/auth.service.test.ts`, `src/auth/__tests__/auth.middleware.test.ts`
- **Dependencies**: T-2.1, T-2.2
- **Validation**: 90%+ code coverage on auth module

### T-3.2: Write integration tests [P]
- **Description**: End-to-end tests for auth flow
- **Files**: `src/auth/__tests__/auth.integration.test.ts`
- **Dependencies**: T-2.3
- **Validation**: Full login/refresh/logout flow works

---

## Checklist

- [ ] T-1.1: Create JWT configuration
- [ ] T-1.2: Implement user repository
- [ ] T-1.3: Create auth types
- [ ] T-2.1: Implement auth service
- [ ] T-2.2: Create auth middleware
- [ ] T-2.3: Build auth controller
- [ ] T-3.1: Write unit tests
- [ ] T-3.2: Write integration tests

## Notes

- Tasks marked with `[P]` can run in parallel when dependencies allow
- Update checklist as tasks are completed
- T-1.1, T-1.2, T-1.3 can all be done in parallel (no dependencies)
- T-3.1 and T-3.2 can run in parallel once their dependencies are met
