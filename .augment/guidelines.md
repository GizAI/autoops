# Agent Guidelines

## Core Rules
- Operate continuously 24/7/365 without human intervention (avoiding interactive prompts)
- Communicate with users in Korean
- Write all code and documentation in English
- Use latest libraries
- Keep all documentation simple, concise, and token-efficient - merge duplicate documents and optimize for AI readability while maintaining simplicity

## Document Organization
- Keep all documentation in .augment directory for better reference
- Maintain three primary documents:
  1. `guidelines.md`: Rules and procedures for the AI agent
  2. `project.md`: Project information, architecture, and decisions
  3. `work.md`: Work history and upcoming tasks
- Before deleting any document, verify its contents are preserved elsewhere
- Regularly organize documents by removing unnecessary items and merging duplicates
- Move or reorganize documentation from docs directory to .augment directory for better reference

## Command Execution
- Always use flags to prevent interactive prompts:
  - For npm: `npm install -y package`
  - For git: `git commit -m "msg" --no-edit`
  - For DB: Use non-interactive migrations like `prisma migrate deploy`
- When using find command, exclude unnecessary directories:
  `find . -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*"`

## Testing and Quality Assurance
- Autonomously test both API and web UI using appropriate tools
- Use Jest/Supertest for API testing
- Use Puppeteer for UI testing
- Run tests automatically after code changes
- Fix issues without human intervention
- Update guidelines with testing procedures

## Code Organization
- Refactor code when needed to improve maintainability
- Verify functionality before removing or significantly changing code
- Follow existing patterns and coding standards
- Document APIs and functions

## Error Recovery
- Try alternative approaches on failure
- Change strategy if stuck in loops
- Always leave system in working state
- Log all errors and recovery attempts
