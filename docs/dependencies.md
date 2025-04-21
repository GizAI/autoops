# Project Dependencies and Requirements

This document tracks the dependencies, requirements, and external services needed for the AutoOps project.

## System Requirements

### Development Environment
- Node.js v16.x or higher
- npm v8.x or higher
- PostgreSQL v14.x or higher with pgvector extension
- Git

### Production Environment
- Linux-based server (Ubuntu 20.04 LTS recommended)
- Node.js v16.x or higher
- PostgreSQL v14.x or higher with pgvector extension
- Nginx or similar web server for reverse proxy
- SSL certificate for HTTPS

## External Services

### Gmail API
**Purpose:** Email integration for reading and sending emails
**Requirements:**
- Google Cloud project with Gmail API enabled
- OAuth 2.0 credentials (client ID, client secret)
- Refresh token for accessing the support@giz.ai account
- Appropriate API permissions:
  - gmail.readonly
  - gmail.modify
  - gmail.compose

### OpenAI API
**Purpose:** Generate embeddings and email responses
**Requirements:**
- OpenAI API key
- Access to embedding models (text-embedding-3-small)
- Access to completion models (gpt-4-turbo or similar)
- Sufficient API quota for expected usage

## NPM Dependencies

### Backend Dependencies
- express: Web framework
- typescript: Programming language
- prisma: ORM for database access
- @prisma/client: Prisma client for database operations
- pg: PostgreSQL client
- pgvector: Vector operations for PostgreSQL
- dotenv: Environment variable management
- jsonwebtoken: JWT authentication
- bcrypt: Password hashing
- cors: Cross-origin resource sharing
- helmet: Security headers
- winston: Logging
- googleapis: Google API client
- openai: OpenAI API client
- langdetect: Language detection

### Backend Development Dependencies
- @types/node: TypeScript definitions for Node.js
- @types/express: TypeScript definitions for Express
- @types/bcrypt: TypeScript definitions for bcrypt
- @types/jsonwebtoken: TypeScript definitions for JWT
- @types/cors: TypeScript definitions for CORS
- nodemon: Development server with auto-reload
- jest: Testing framework
- ts-jest: TypeScript support for Jest
- supertest: HTTP testing

### Frontend Dependencies
- react: UI library
- react-dom: DOM bindings for React
- next: React framework
- typescript: Programming language
- tailwindcss: CSS framework
- axios: HTTP client
- swr: Data fetching library
- react-hook-form: Form handling
- zod: Schema validation
- date-fns: Date utilities
- react-icons: Icon library

### Frontend Development Dependencies
- @types/react: TypeScript definitions for React
- @types/react-dom: TypeScript definitions for React DOM
- eslint: Linting
- prettier: Code formatting
- postcss: CSS processing
- autoprefixer: CSS vendor prefixing

## Database Requirements

### PostgreSQL Extensions
- pgvector: Required for vector operations
- uuid-ossp: For UUID generation (optional)

### Database Schema
- users: User accounts and authentication
- processed_emails: Metadata for processed emails
- knowledge_base: Knowledge entries with vector embeddings
- responses: Generated email responses

## Environment Variables

### Backend
- PORT: Server port
- NODE_ENV: Environment (development, production)
- DATABASE_URL: PostgreSQL connection string
- JWT_SECRET: Secret for JWT signing
- JWT_EXPIRES_IN: JWT expiration time
- GMAIL_CLIENT_ID: Google OAuth client ID
- GMAIL_CLIENT_SECRET: Google OAuth client secret
- GMAIL_REDIRECT_URI: OAuth redirect URI
- GMAIL_REFRESH_TOKEN: Gmail API refresh token
- SUPPORT_EMAIL: Email address for support
- OPENAI_API_KEY: OpenAI API key
- OPENAI_MODEL: OpenAI model to use
- LOG_LEVEL: Logging level

### Frontend
- NEXT_PUBLIC_API_URL: Backend API URL
- NEXT_PUBLIC_SUPPORT_EMAIL: Support email address
