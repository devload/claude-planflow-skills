# Claude Code Planflow Skills

Interactive Plan Mode + Speckit conversion workflow skills for Claude Code.

## Overview

This package provides a set of slash commands that enable an interactive, step-by-step planning workflow with Speckit-compatible output format.

### Features

- **Interactive Planning**: Yes/no decision points at each step
- **Speckit Compatibility**: Generates `plan.md` and `tasks.md` following [GitHub Spec Kit](https://github.com/github/spec-kit) standards
- **Modular Commands**: Use individual commands or the full workflow
- **Feedback Loop**: Iteratively refine plans before implementation

## Installation

### Option 1: Copy to your project

```bash
# Clone or download this repo
git clone https://github.com/your-username/claude-planflow-skills.git

# Copy .claude/commands/ to your project
cp -r claude-planflow-skills/.claude/commands/ /path/to/your/project/.claude/commands/
```

### Option 2: Global installation

```bash
# Copy to your home directory's .claude folder
cp -r .claude/commands/ ~/.claude/commands/
```

## Commands

### `/planflow` - Main Workflow

The primary command that guides you through the entire planning process.

```
/planflow <feature-name> "<description>"
```

**Example:**
```
/planflow auth-feature "Implement JWT authentication with refresh tokens"
```

**Workflow Steps:**
1. **Pre-Plan Check**: Load existing specs? (yes/no)
2. **Plan Generation**: Analyze codebase, create plan
3. **Speckit Conversion**: Convert to structured format? (yes/no)
4. **Feedback Collection**: Any modifications needed?
5. **Implementation Start**: Begin coding? (yes/no)

### `/boot` - Load Existing Specs

Scan and summarize existing specifications and tasks.

```
/boot [feature-name]
```

**Examples:**
```
/boot                  # Load all features
/boot auth-feature     # Load specific feature
```

### `/plan2speckit` - Convert to Speckit Format

Transform a plan file into Speckit-standard `plan.md` and `tasks.md`.

```
/plan2speckit <feature-name>
```

**Output Structure:**
```
specs/<feature-name>/
├── plan.md      # Summary, Technical Context, Project Structure
└── tasks.md     # Phased task breakdown with dependencies
```

### `/postplan` - Apply Feedback

Update plan and tasks based on user feedback.

```
/postplan <feature-name> ["<feedback>"]
```

**Examples:**
```
/postplan auth-feature
/postplan auth-feature "Split T-1.2 into frontend and backend tasks"
```

## Output Structure

### Plans Directory

```
plans/
└── <feature>-YYYYMMDD-HHMM.md    # Timestamped plan files
```

### Specs Directory (Speckit Format)

```
specs/
└── <feature>/
    ├── plan.md       # Technical plan document
    └── tasks.md      # Task breakdown with checklist
```

## Task Format

Tasks in `tasks.md` follow this structure:

```markdown
### T-1.1: Task Title
- **Description**: What needs to be done
- **Files**: `path/to/file.ts`
- **Dependencies**: None | T-x.x
- **Validation**: How to verify completion

### T-1.2: Another Task [P]
- **Description**: This task can run in parallel
- **Files**: `path/to/file.ts`
- **Dependencies**: T-1.1
- **Validation**: Completion criteria
```

- `[P]` marker indicates parallelizable tasks
- Dependencies reference other task IDs

## Example Session

```
User: /planflow user-profile "Add user profile management with avatar upload"

Claude: Plan을 생성하기 전에 /boot로 기존 산출물을 로드할까요? (yes/no)

User: no

Claude: [Analyzes codebase, generates plan]
        Plan saved to: plans/user-profile-20260104-1530.md

        Plan을 specs/user-profile/로 변환할까요? (yes/no)

User: yes

Claude: [Creates specs/user-profile/plan.md and tasks.md]

        수정할 점이 있나요? (no 또는 변경사항 입력)

User: Add a task for image compression

Claude: [Updates tasks.md with new task]

        이제 구현을 시작할까요? (yes/no)

User: yes

Claude: Starting with T-1.1: Create user profile database schema...
```

## Customization

### Allowed Tools

Each command specifies minimal required tools in its frontmatter:

| Command | Allowed Tools |
|---------|---------------|
| boot | Read, Glob, Grep, Bash |
| plan2speckit | Read, Write, Bash, Glob, Grep |
| postplan | Read, Edit, Write, Glob |
| planflow | Read, Write, Edit, Bash, Glob, Grep, AskUserQuestion, Skill |

### Modifying Templates

Edit the markdown templates in each command file to customize:
- Plan file structure
- Task format
- Output messages

## Requirements

- Claude Code CLI
- No external dependencies (Speckit installation not required)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file

## Related

- [GitHub Spec Kit](https://github.com/github/spec-kit) - Spec-driven development toolkit
- [Claude Code](https://claude.ai/code) - Anthropic's CLI for Claude
