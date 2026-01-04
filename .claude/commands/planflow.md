---
description: "Interactive planning workflow with Speckit conversion"
argument-hint: "<feature-name> \"<prompt>\""
allowed-tools: ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "AskUserQuestion", "Skill"]
---

# Planflow: Interactive Planning Workflow

You are an interactive planning assistant. Guide the user through a complete planning workflow with yes/no decision points.

## Arguments

- `$ARGUMENTS`: Feature name and planning prompt
  - Format: `<feature-name> "<description or requirements>"`
  - Example: `auth-feature "Implement JWT authentication with refresh tokens"`

## Workflow Steps

Execute these steps in order, waiting for user response at each decision point.

---

### Step A: Pre-Plan Check

**Ask the user:**
```
Plan을 생성하기 전에 /boot로 기존 산출물을 로드/정리할까요?

Options:
- yes: 기존 specs/tasks가 있으면 로드하고 요약을 먼저 확인
- no: 바로 새 Plan 생성으로 진행
```

**If yes:**
1. Execute: `/boot <feature-name>`
2. Show the summary of existing specs
3. Ask: "기존 산출물을 참고하여 Plan을 생성할까요? (yes/no)"
   - yes: Incorporate existing context
   - no: Start fresh

**If no:** Proceed to Step B.

---

### Step B: Plan Generation (Plan Mode Behavior)

**Important**: Act like Plan Mode - analyze and plan only, NO code modifications.

1. **Parse the prompt** from $ARGUMENTS
2. **Analyze the codebase** relevant to the feature:
   - Use Glob to find related files
   - Use Grep to search for relevant code patterns
   - Use Read to understand existing implementations
3. **Generate a comprehensive plan** including:
   - Objectives and scope
   - Technical approach
   - File structure changes
   - Implementation phases
   - Task breakdown
   - Dependencies and risks

4. **Save the plan** to `plans/<feature>-YYYYMMDD-HHMM.md`:
   ```bash
   # Get current timestamp
   timestamp=$(date +%Y%m%d-%H%M)
   # Create plans directory if needed
   mkdir -p plans
   # Save to: plans/<feature>-<timestamp>.md
   ```

5. **Display plan summary** to the user:
   ```
   ## Plan Generated: <feature-name>

   **Saved to**: plans/<feature>-YYYYMMDD-HHMM.md

   ### Summary
   [Brief overview of the plan]

   ### Phases
   1. [Phase 1 name]: [Brief description]
   2. [Phase 2 name]: [Brief description]
   ...

   ### Key Files
   - [List of main files to be created/modified]

   ### Estimated Tasks
   - Total: X tasks
   - Phase 1: Y tasks
   - Phase 2: Z tasks
   ```

---

### Step C: Speckit Conversion Check

**Ask the user:**
```
Plan을 specs/<feature>/plan.md 및 tasks.md로 변환(Speckit 형식)할까요?

Options:
- yes: /plan2speckit 실행하여 구조화된 산출물 생성
- no: Plan 파일만 유지하고 넘어감
```

**If yes:**
1. Execute: `/plan2speckit <feature-name>`
2. Show the created files summary

**If no:** Proceed to Step D.

---

### Step D: Feedback Collection

**Ask the user:**
```
이 계획/태스크에 수정할 점이 있나요?

- 없으면: 'no' 입력
- 있으면: 변경사항을 직접 입력 (예: "T-1.2를 두 개로 분리해주세요")
```

**If feedback provided (not 'no'):**
1. Execute: `/postplan <feature-name> "<feedback>"`
2. Show the changes summary
3. Ask again: "추가로 수정할 점이 있나요? (no/변경사항)"
4. Repeat until user says 'no'

**If 'no':** Proceed to Step E.

---

### Step E: Implementation Start

**Ask the user:**
```
이제 구현을 시작할까요?

Options:
- yes: 구현 가이드와 첫 번째 작업 시작
- no: 계획 단계 종료
```

**If yes:**
1. Read the tasks from `specs/<feature>/tasks.md` (or parse from plan file)
2. Display implementation guide:
   ```
   ## Implementation Guide: <feature-name>

   ### Starting Point
   Begin with: T-1.1 - [Task Title]

   ### Recommended Order
   1. T-1.1: [Title] - [Brief description]
   2. T-1.2: [Title] - [Brief description]
   ...

   ### First File to Create/Modify
   `path/to/first/file.ts`

   ### Ready to begin?
   I'll start implementing T-1.1 now.
   ```
3. Begin implementation of the first task

**If no:**
```
## Planning Complete

**Feature**: <feature-name>
**Plan saved at**: plans/<feature>-YYYYMMDD-HHMM.md
**Specs saved at**: specs/<feature>/ (if converted)

To resume later:
- View plan: Read plans/<feature>-*.md
- Load specs: /boot <feature>
- Start implementation: Continue from T-1.1

Session ended.
```

---

## Plan File Template

When generating the plan in Step B, use this structure:

```markdown
# Plan: <feature-name>

**Date**: YYYY-MM-DD HH:MM
**Status**: Draft
**Prompt**: "<original user prompt>"

## Objectives

[What this feature aims to achieve]

## Scope

### In Scope
- [Item 1]
- [Item 2]

### Out of Scope
- [Item 1]

## Technical Approach

### Architecture
[High-level architecture description]

### Key Decisions
1. [Decision 1]: [Rationale]
2. [Decision 2]: [Rationale]

## Implementation Phases

### Phase 1: [Name]
**Goal**: [Phase objective]
**Tasks**:
- [ ] [Task 1.1]
- [ ] [Task 1.2]

### Phase 2: [Name]
**Goal**: [Phase objective]
**Tasks**:
- [ ] [Task 2.1]
- [ ] [Task 2.2]

## File Changes

### New Files
- `path/to/new/file.ts` - [Purpose]

### Modified Files
- `path/to/existing/file.ts` - [What changes]

## Dependencies

- [External dependency 1]
- [Internal dependency 1]

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk 1] | [High/Medium/Low] | [Mitigation strategy] |

## Notes

[Any additional notes or considerations]
```

---

## Error Handling

- **Missing arguments**: "Usage: /planflow <feature-name> \"<prompt>\"\nExample: /planflow auth \"Implement JWT authentication\""
- **Empty prompt**: "Please provide a description of what you want to build."
- **Invalid feature name**: Use kebab-case, no spaces or special characters.

---

Now execute planflow for: $ARGUMENTS
