---
description: "Convert plan to Speckit format (plan.md + tasks.md)"
argument-hint: "<feature-name>"
allowed-tools: ["Read", "Write", "Bash", "Glob", "Grep"]
---

# Plan to Speckit Converter

You are a Speckit converter. Your job is to transform a plan file into the Speckit standard structure.

## Arguments

- `$ARGUMENTS`: **Required** feature name (e.g., `auth-feature`)

## Instructions

### Step 1: Find the source plan

Look for the plan in this order:
1. `plans/$ARGUMENTS-*.md` (most recent by filename timestamp)
2. If not found, check if there's context from a previous planflow execution

If no plan is found, output: "No plan found for feature '$ARGUMENTS'. Please run /planflow first."

### Step 2: Create output directory

```bash
mkdir -p specs/$ARGUMENTS
```

### Step 3: Generate plan.md (Speckit format)

Create `specs/$ARGUMENTS/plan.md` with this structure:

```markdown
# Plan: <feature-name>

- **Branch**: feature/<feature-name>
- **Date**: <current date YYYY-MM-DD>
- **Spec**: specs/<feature-name>/spec.md

## Summary

[Extract the main objectives and approach from the source plan]

## Technical Context

| Aspect | Value |
|--------|-------|
| Language/Version | [Extract from plan or infer from project] |
| Primary Dependencies | [List key dependencies] |
| Storage | [Database/storage solution if applicable] |
| Testing | [Test framework] |
| Target Platform | [Web/Mobile/CLI/etc] |
| Constraints | [Any limitations or requirements] |

## Project Structure

[List the files/directories that will be created or modified]

```
src/
├── [relevant paths]
└── [from the plan]
```

## Architecture Notes

[Any architectural decisions or patterns mentioned in the plan]
```

### Step 4: Generate tasks.md (Speckit format)

Create `specs/$ARGUMENTS/tasks.md` with this structure:

```markdown
# Tasks: <feature-name>

Generated from: plans/<feature-name>-YYYYMMDD-HHMM.md
Date: <current date>

## Phase 1: [Phase Name - e.g., Setup, Core Implementation]

### T-1.1: [Task Title]
- **Description**: [Detailed description of what needs to be done]
- **Files**: `path/to/file.ts`, `path/to/other.ts`
- **Dependencies**: None
- **Validation**: [How to verify this task is complete]

### T-1.2: [Task Title] [P]
- **Description**: [Description]
- **Files**: `path/to/file.ts`
- **Dependencies**: T-1.1
- **Validation**: [Validation criteria]

## Phase 2: [Phase Name - e.g., Integration, Testing]

### T-2.1: [Task Title]
- **Description**: [Description]
- **Files**: `path/to/file.ts`
- **Dependencies**: T-1.2
- **Validation**: [Validation criteria]

---

## Checklist

- [ ] T-1.1: [Task Title]
- [ ] T-1.2: [Task Title]
- [ ] T-2.1: [Task Title]

## Notes

- Tasks marked with `[P]` can run in parallel when dependencies allow
- Update checklist as tasks are completed
```

### Step 5: Output summary

After creating the files, output:

```
## Speckit Conversion Complete

**Feature**: $ARGUMENTS

**Created Files**:
- specs/$ARGUMENTS/plan.md
- specs/$ARGUMENTS/tasks.md

**Summary**:
- Total Phases: X
- Total Tasks: Y
- Parallelizable Tasks: Z

**Next Steps**:
1. Review the generated specs in `specs/$ARGUMENTS/`
2. Run `/boot $ARGUMENTS` to verify the structure
3. Use `/postplan $ARGUMENTS` if adjustments are needed
```

## Conversion Rules

1. **Task ID Format**: `T-<phase>.<sequence>` (e.g., T-1.1, T-2.3)
2. **Parallel Marker**: Add `[P]` suffix for tasks that can run concurrently
3. **Dependencies**: Reference other task IDs (e.g., "T-1.1, T-1.2")
4. **Files**: List all files that will be created or modified
5. **Validation**: Include testable completion criteria

## Error Handling

- If `$ARGUMENTS` is empty: "Error: Feature name is required. Usage: /plan2speckit <feature-name>"
- If plan file is malformed: Attempt best-effort conversion and note any issues

Now convert the plan for feature: $ARGUMENTS
