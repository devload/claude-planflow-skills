# Tasks: user-profile

## Phase 1: Database & Types

### T-1.1: Extend User model with profile fields
- [ ] Completed
- **Description**: Add displayName, bio, avatarUrl fields to the existing User model in Prisma schema
- **Files**: `prisma/schema.prisma`
- **Dependencies**: test-auth (T-1.3)
- **Validation**: `npx prisma generate` succeeds, new fields accessible in Prisma client

### T-1.2: Create TypeScript interfaces for profile DTOs
- [ ] Completed
- **Description**: Define ProfileResponse, UpdateProfileRequest, and AvatarUploadResponse interfaces
- **Files**: `src/types/profile.types.ts`
- **Dependencies**: T-1.1
- **Validation**: Types compile without errors, used in service layer

### T-1.3: Create zod validation schemas for profile updates [P]
- [ ] Completed
- **Description**: Define validation schemas for profile update (displayName max 50 chars, bio max 500 chars)
- **Files**: `src/validators/profile.validator.ts`
- **Dependencies**: None
- **Validation**: Invalid inputs rejected with descriptive error messages

---

## Phase 2: Profile CRUD

### T-2.1: Create profile.service.ts with getProfile and updateProfile [P]
- [ ] Completed
- **Description**: Implement profile retrieval and update business logic with Prisma operations
- **Files**: `src/services/profile.service.ts`
- **Dependencies**: T-1.1, T-1.2
- **Validation**: Unit tests pass for get/update operations

### T-2.2: Create profile.routes.ts with GET/PATCH /profile endpoints [P]
- [ ] Completed
- **Description**: Implement REST endpoints for viewing and updating profile, integrate with auth middleware
- **Files**: `src/routes/profile.routes.ts`
- **Dependencies**: T-2.1, test-auth (T-3.1)
- **Validation**: Endpoints respond correctly with authentication

### T-2.3: Add profile validators for input sanitization
- [ ] Completed
- **Description**: Apply zod validation middleware to profile routes, sanitize input strings
- **Files**: `src/routes/profile.routes.ts`, `src/validators/profile.validator.ts`
- **Dependencies**: T-1.3, T-2.2
- **Validation**: Invalid inputs return 400 with error details

### T-2.4: Write unit tests for profile service
- [ ] Completed
- **Description**: Test getProfile returns correct data, updateProfile updates only specified fields
- **Files**: `tests/unit/profile.service.test.ts`
- **Dependencies**: T-2.1
- **Validation**: All unit tests pass with >80% coverage

---

## Phase 3: Avatar Upload Infrastructure

### T-3.1: Configure multer middleware for image uploads
- [ ] Completed
- **Description**: Set up multer with memory storage, file filter for images, size limits
- **Files**: `src/middleware/upload.middleware.ts`
- **Dependencies**: None
- **Validation**: File upload works in isolation, rejects invalid files

### T-3.2: Create storage.service.ts with abstract storage interface [P]
- [ ] Completed
- **Description**: Define StorageAdapter interface with save, delete, getUrl methods
- **Files**: `src/services/storage.service.ts`
- **Dependencies**: None
- **Validation**: Interface can be implemented by different storage backends

### T-3.3: Implement local filesystem storage adapter [P]
- [ ] Completed
- **Description**: Implement StorageAdapter for local filesystem with UUID filenames
- **Files**: `src/services/storage.service.ts`
- **Dependencies**: T-3.2
- **Validation**: Files saved to uploads/avatars/, retrievable by URL

### T-3.4: Implement image processing with sharp
- [ ] Completed
- **Description**: Create image.service.ts to resize images to 200x200 and 400x400, convert to webp
- **Files**: `src/services/image.service.ts`
- **Dependencies**: T-3.1
- **Validation**: Output images are correct dimensions and format

### T-3.5: Add file validation (max 5MB, jpg/png/webp only)
- [ ] Completed
- **Description**: Configure multer fileFilter to reject invalid file types and sizes
- **Files**: `src/middleware/upload.middleware.ts`
- **Dependencies**: T-3.1
- **Validation**: Large files and invalid types return 400 error

---

## Phase 4: Avatar Endpoints

### T-4.1: POST /profile/avatar - Upload new avatar
- [ ] Completed
- **Description**: Handle avatar upload, process image, save to storage, update user avatarUrl
- **Files**: `src/routes/profile.routes.ts`, `src/services/profile.service.ts`
- **Dependencies**: T-3.1, T-3.3, T-3.4, T-2.2
- **Validation**: Avatar uploaded, URL returned, old avatar cleaned up

### T-4.2: DELETE /profile/avatar - Remove current avatar
- [ ] Completed
- **Description**: Delete avatar from storage, set user avatarUrl to null
- **Files**: `src/routes/profile.routes.ts`, `src/services/profile.service.ts`
- **Dependencies**: T-4.1
- **Validation**: Avatar removed from storage and database

### T-4.3: Implement avatar URL generation (signed URLs for S3)
- [ ] Completed
- **Description**: Generate public URLs for local storage, signed URLs for S3 storage
- **Files**: `src/services/storage.service.ts`
- **Dependencies**: T-3.2, T-3.3
- **Validation**: URLs are accessible and expire correctly for S3

### T-4.4: Add cleanup job for orphaned avatar files
- [ ] Completed
- **Description**: Create utility to find and delete avatar files not referenced by any user
- **Files**: `src/services/storage.service.ts`, `src/scripts/cleanup-avatars.ts`
- **Dependencies**: T-4.2
- **Validation**: Orphaned files identified and deleted on schedule

---

## Phase 5: Testing & Polish

### T-5.1: Write integration tests for profile endpoints [P]
- [ ] Completed
- **Description**: Test GET/PATCH /profile with valid/invalid auth, valid/invalid data
- **Files**: `tests/integration/profile.test.ts`
- **Dependencies**: T-2.2, T-2.3
- **Validation**: All integration tests pass, edge cases covered

### T-5.2: Write integration tests for avatar upload/delete [P]
- [ ] Completed
- **Description**: Test avatar upload with various file types/sizes, delete, and re-upload
- **Files**: `tests/integration/profile.test.ts`
- **Dependencies**: T-4.1, T-4.2
- **Validation**: All avatar tests pass, files properly managed

### T-5.3: Add error handling for storage failures
- [ ] Completed
- **Description**: Handle disk full, permission errors, S3 connectivity issues gracefully
- **Files**: `src/services/storage.service.ts`, `src/middleware/error.middleware.ts`
- **Dependencies**: T-3.3, T-4.1
- **Validation**: Storage errors return appropriate HTTP status codes

### T-5.4: Add rate limiting to upload endpoint
- [ ] Completed
- **Description**: Limit avatar uploads to 5 per hour per user to prevent abuse
- **Files**: `src/routes/profile.routes.ts`, `src/middleware/rateLimit.middleware.ts`
- **Dependencies**: T-4.1, test-auth (T-4.3)
- **Validation**: Requests blocked after limit exceeded, returns 429

---

## Task Summary

| Phase | Tasks | Parallelizable |
|-------|-------|----------------|
| Phase 1: Database & Types | 3 | T-1.2 & T-1.3 |
| Phase 2: Profile CRUD | 4 | T-2.1, T-2.2 |
| Phase 3: Avatar Infrastructure | 5 | T-3.1, T-3.2, T-3.3 |
| Phase 4: Avatar Endpoints | 4 | Sequential |
| Phase 5: Testing & Polish | 4 | T-5.1, T-5.2 |
| **Total** | **20** | |

## Critical Path

```
T-1.1 → T-1.2 → T-2.1 → T-2.2 → T-4.1 → T-4.2 → T-5.2 → T-5.4
```

## Cross-Feature Dependencies

| This Feature | Depends On | Dependency Type |
|--------------|------------|-----------------|
| T-2.2 | test-auth T-3.1 | Auth middleware |
| T-5.4 | test-auth T-4.3 | Rate limiting middleware |
| T-1.1 | test-auth T-1.3 | User model extension |
