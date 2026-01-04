# Plan: example-feature

- **Branch**: feature/example-feature
- **Date**: 2026-01-04
- **Spec**: specs/example-feature/spec.md

## Summary

Implement a user authentication system with JWT tokens and refresh token rotation. The system will support login, logout, token refresh, and session management.

## Technical Context

| Aspect | Value |
|--------|-------|
| Language/Version | TypeScript 5.x |
| Primary Dependencies | express, jsonwebtoken, bcrypt |
| Storage | PostgreSQL with Prisma ORM |
| Testing | Jest + Supertest |
| Target Platform | Node.js REST API |
| Constraints | Must be stateless, support horizontal scaling |

## Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.middleware.ts
│   └── auth.types.ts
├── users/
│   └── user.repository.ts
└── config/
    └── jwt.config.ts
```

## Architecture Notes

- Access tokens expire in 15 minutes
- Refresh tokens expire in 7 days with rotation
- Tokens stored in HTTP-only cookies for web clients
- API clients use Authorization header
