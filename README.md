# AutoOps

AutoOps is an automated operations system designed to streamline and automate email support responses based on a knowledge base built from previous interactions. The system uses AI to generate contextually relevant responses while allowing human review before sending.

## Overview

AutoOps helps support teams by automating the initial response to customer emails. It processes incoming emails, searches a knowledge base for relevant information, and generates draft responses for review. The system learns from previous interactions to improve response quality over time.

## Key Features

- **Email Processing**: Automatically fetches and processes incoming support emails
- **Knowledge Base**: Builds and maintains a searchable knowledge base from previous interactions
- **AI-Powered Responses**: Generates contextually relevant draft responses using OpenAI
- **Vector Search**: Uses embeddings for semantic search of the knowledge base
- **Multi-language Support**: Detects and responds in the customer's language
- **Admin Dashboard**: Web interface for reviewing and sending draft responses
- **Real-time Processing**: Webhook-based email processing for immediate handling

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with pgvector for vector storage
- Prisma ORM
- Gmail API for email integration
- OpenAI API for response generation and embeddings
- JWT for authentication

### Frontend
- React with Next.js
- TypeScript
- Tailwind CSS

## Architecture

### Email Processing Pipeline
1. **Email Fetching**: Retrieves emails via Gmail API
2. **Content Extraction**: Parses email content and metadata
3. **Language Detection**: Identifies the language of the email
4. **Knowledge Base Search**: Finds relevant information using vector similarity
5. **Response Generation**: Creates draft responses using OpenAI
6. **Human Review**: Admin reviews and optionally edits responses
7. **Sending**: Approved responses are sent back to the customer

### System Components
- **Email Controller**: Manages email fetching and processing
- **Knowledge Controller**: Handles knowledge base operations
- **Response Controller**: Manages response generation and sending
- **OpenAI Service**: Interfaces with OpenAI API for response generation
- **Authentication Middleware**: Handles user authentication and authorization

## Current Status

- Backend core structure implemented
- Database schema defined with Prisma
- Email processing pipeline functional
- Response generation with OpenAI integrated
- Admin user management implemented
- Basic frontend dashboard operational
- Automated testing framework established
- Continuous operation system implemented

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL with pgvector extension
- Gmail API credentials
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/GizAI/autoops.git
cd autoops
```

2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Set up the database
```bash
# Install pgvector extension in PostgreSQL
# Then run Prisma migrations
npx prisma migrate dev
```

5. Start the development servers
```bash
# Start backend server (from root directory)
npm run dev

# Start frontend server (in another terminal)
cd frontend
npm run dev
```

## Project Structure

```
autoops/
├── .augment/         # Project documentation and task tracking
├── frontend/         # React Next.js frontend
│   ├── public/        # Static assets
│   ├── src/
│   │   ├── app/        # Next.js app router pages
│   │   ├── components/ # React components
│   │   └── lib/        # Utility functions and API clients
│   └── package.json
├── prisma/           # Prisma schema and migrations
├── src/              # Backend source code
│   ├── controllers/   # Request handlers
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   ├── scripts/       # Utility scripts
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── __tests__/     # Test files
├── tests/            # E2E tests
└── package.json
```

## Development Workflow

1. **Email Processing Improvements**:
   - Enhance email parsing and metadata extraction
   - Improve handling of attachments and complex email formats

2. **Knowledge Base Enhancements**:
   - Optimize vector search for better relevance
   - Implement knowledge base management features

3. **Response Quality Improvements**:
   - Refine OpenAI prompts for better responses
   - Implement response templates and customization

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact support@giz.ai
