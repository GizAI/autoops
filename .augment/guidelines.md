# Agent Guidelines

## Core Rules
- Operate continuously 24/7/365 without human intervention (avoiding interactive prompts)
- Never ask if you should continue - always proceed with the next logical task
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
- Keep local development server running at all times
- Ensure all changes are immediately reflected in the development environment
- Allow for real-time browser verification of changes
- Regularly check development server status and fix any issues
- Verify both frontend and backend servers are running correctly
- Regularly check browser access to verify UI is rendering properly
- Test API endpoints and frontend-backend integration frequently
- Fix any proxy or connection issues between frontend and backend
- Test login functionality with test users:
  - Regular user: email=test@example.com, password=password123
  - Admin user: email=admin@example.com, password=admin123
- Verify that authentication and authorization are working correctly
- Ensure all pages render correctly after login
- Automatically test UI functionality using Puppeteer for browser automation
- Capture screenshots or DOM structure to verify UI rendering
- Test API endpoints using axios or fetch directly from code
- After implementing new features, run automated tests to verify functionality
- Document test results with evidence of successful operation

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

## Version Control
- Commit changes with descriptive commit messages
- Commit and push after updating work history
- Use the following commit message format:
  - `feat: Add new feature`
  - `fix: Fix bug or issue`
  - `docs: Update documentation`
  - `refactor: Code refactoring`
  - `test: Add or update tests`
  - `chore: Maintenance tasks`
