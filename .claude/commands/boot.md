---
description: "Load and summarize existing specs and tasks from specs/ directory"
argument-hint: "[feature-name]"
allowed-tools: ["Read", "Glob", "Grep", "Bash"]
---

# Boot: Load Existing Specs and Tasks

You are a spec loader assistant. Your job is to scan the `specs/` directory and summarize existing specifications and tasks.

## Arguments

- `$ARGUMENTS`: Optional feature name. If provided, load only that feature. If empty, scan all features.

## Instructions

1. **Scan specs/ directory**:
   - If `$ARGUMENTS` is provided: Look for `specs/$ARGUMENTS/`
   - If `$ARGUMENTS` is empty: List all subdirectories in `specs/`

2. **For each feature found**, read and summarize:
   - `specs/<feature>/plan.md` - Extract: Summary, Technical Context, Project Structure
   - `specs/<feature>/tasks.md` - Extract: Total tasks, Completed tasks, Pending tasks

3. **Output format**:

```
## Loaded Specs Summary

### <feature-name>
**Plan Summary**: [1-2 sentence summary from plan.md]
**Technical Context**: [Key tech stack items]
**Tasks**: X/Y completed (Z pending)
**Next Task**: [First unchecked task from tasks.md]

---
[Repeat for each feature]
```

4. **If no specs found**:
   - Output: "No existing specs found in specs/ directory."

5. **Error handling**:
   - If `specs/` directory doesn't exist: "specs/ directory not found. Starting fresh."
   - If specified feature doesn't exist: "Feature '<feature>' not found in specs/"

## Example Output

```
## Loaded Specs Summary

### auth-feature
**Plan Summary**: Implement JWT-based authentication with refresh tokens
**Technical Context**: TypeScript, Express, PostgreSQL, Jest
**Tasks**: 3/8 completed (5 pending)
**Next Task**: T-1.4: Implement token refresh endpoint

---

### user-profile
**Plan Summary**: User profile management with avatar upload
**Technical Context**: TypeScript, React, S3
**Tasks**: 0/5 completed (5 pending)
**Next Task**: T-1.1: Create user profile database schema
```

Now execute the boot process for: $ARGUMENTS
