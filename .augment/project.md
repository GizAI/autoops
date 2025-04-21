# Project Information

## Overview
- AutoOps: Email automation system with AI-powered responses
- Backend: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- Frontend: Next.js, React, TypeScript, Tailwind CSS (planned)
- APIs: Gmail API for email processing, OpenAI for response generation
- Database: PostgreSQL with pgvector for embeddings

## Key Objectives
1. Automate email response generation for support@giz.ai
2. Build a knowledge base from previous email interactions
3. Support multiple languages in responses
4. Create a user-friendly interface for reviewing and sending draft responses
5. Design the system to be extensible for future automation needs

## Architecture
- Email processing pipeline with Gmail API integration
- Vector embeddings for knowledge base search
- AI-powered response generation
- Admin dashboard for managing responses

## Current Status
- Backend core structure implemented
- Database schema defined
- Basic API endpoints created
- Response controller implemented
- OpenAI service integration complete
- Prisma migrations set up
- Database initialization script implemented
- Gmail API webhook for real-time processing implemented
- Automated testing framework established

## Key Decisions

### Backend: Node.js with Express and TypeScript
- TypeScript provides type safety and better developer experience
- Node.js offers excellent performance for I/O-bound operations
- Express is mature and well-documented

### Database: PostgreSQL with pgvector
- PostgreSQL is robust and mature
- pgvector extension provides efficient vector operations for embeddings
- Relational model fits well with structured data

### ORM: Prisma
- First-class TypeScript support with auto-generated types
- Intuitive API with strong type safety
- Good migration system for schema changes

### Email Integration: Direct Gmail API
- Reduces duplication of data
- Ensures access to up-to-date email content
- Simplifies compliance with data protection regulations

### Frontend: React with Next.js
- Server-side rendering improves performance
- Strong TypeScript support
- Built-in routing and API routes

### Authentication: JWT-based
- Stateless operation fits well with API architecture
- Simple to implement and use
- Allows for role-based access control

### Email Processing: Webhook-based
- Real-time processing of new emails
- Reduces need for polling
- More efficient use of resources

### Vector Search: Custom SQL via Prisma's $queryRaw
- Prisma doesn't natively support vector operations
- Custom SQL allows for efficient vector queries
- Maintains type safety through Prisma's $queryRaw

### Database: PostgreSQL with pgvector
- PostgreSQL is robust and mature
- pgvector extension provides efficient vector operations for embeddings
- Relational model fits well with structured data

### ORM: Prisma
- First-class TypeScript support with auto-generated types
- Intuitive API with strong type safety
- Good migration system for schema changes

### Email Integration: Direct Gmail API
- Reduces duplication of data
- Ensures access to up-to-date email content
- Simplifies compliance with data protection regulations

### Frontend: React with Next.js
- Server-side rendering improves performance
- Strong TypeScript support
- Built-in routing and API routes

### Authentication: JWT-based
- Stateless operation fits well with API architecture
- Simple to implement and use
- Allows for role-based access control

### Email Processing: Webhook-based
- Real-time processing of new emails
- Reduces need for polling
- More efficient use of resources
