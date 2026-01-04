# user-profile

User profile management with avatar upload

## Summary

Implement a comprehensive user profile management system that allows authenticated users to view and update their profile information, upload/update/delete avatar images, and manage profile visibility and preferences. Integrates with the existing test-auth authentication system.

## Technical Context

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| File Upload | multer |
| Image Processing | sharp |
| Storage | Local FS / AWS S3 |
| Validation | zod |
| Testing | Jest, Supertest |

## Project Structure

```
src/
├── services/
│   ├── profile.service.ts      # Profile business logic
│   ├── storage.service.ts      # File storage abstraction
│   └── image.service.ts        # Image processing with sharp
├── routes/
│   └── profile.routes.ts       # Profile API endpoints
├── middleware/
│   └── upload.middleware.ts    # Multer configuration
├── validators/
│   └── profile.validator.ts    # Profile input validation
└── types/
    └── profile.types.ts        # Profile-related TypeScript types

uploads/
└── avatars/                    # Local avatar storage directory

tests/
└── integration/
    └── profile.test.ts         # Profile integration tests
```

## Key Design Decisions

1. **Multer for File Uploads**: Industry-standard multipart/form-data handling for Express
2. **Sharp for Image Processing**: High-performance image resizing and optimization
3. **Pluggable Storage**: Abstract storage interface supporting local filesystem and S3
4. **UUID Filenames**: Prevent filename collisions and path traversal attacks
5. **Soft Delete for Avatars**: Keep old avatars for potential recovery

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| STORAGE_TYPE | Storage backend type | local / s3 |
| UPLOAD_DIR | Local upload directory | ./uploads |
| MAX_FILE_SIZE | Max upload size in bytes | 5242880 |
| AWS_S3_BUCKET | S3 bucket name (if using S3) | my-app-avatars |
| AWS_REGION | AWS region (if using S3) | us-east-1 |

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /profile | Get current user's profile | Yes |
| PATCH | /profile | Update profile fields | Yes |
| POST | /profile/avatar | Upload avatar image | Yes |
| DELETE | /profile/avatar | Remove avatar image | Yes |

## Dependencies

### Internal
- Requires `test-auth` (auth middleware, User model, JWT verification)

### New npm packages
- `multer` - Multipart form handling
- `@types/multer` - TypeScript types for multer
- `sharp` - Image processing
- `uuid` - Generate unique filenames
- `@aws-sdk/client-s3` - S3 client (optional)
