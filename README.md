# AutoOps

AutoOps is an automated operations system designed to streamline and automate various operational tasks for businesses. The initial focus is on automating email support responses based on a knowledge base built from previous emails.

## Features

- **Email Automation**: Automatically processes incoming support emails and generates draft responses
- **Knowledge Base**: Builds and maintains a knowledge base from previous email responses
- **Multi-language Support**: Detects and responds in the customer's language
- **Vector Search**: Uses vector embeddings for semantic search of the knowledge base
- **Admin Dashboard**: Web interface for reviewing and sending draft responses

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with pgvector for vector storage
- Prisma ORM
- Gmail API for email integration
- OpenAI API for response generation and embeddings

### Frontend
- React with Next.js
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL with pgvector extension
- Gmail API credentials
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/autoops.git
cd autoops
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend
cp .env.example .env
# Edit .env with your credentials
```

4. Set up the database
```bash
# Install pgvector extension in PostgreSQL
# Then run Prisma migrations
cd backend
npx prisma migrate dev
```

5. Start the development servers
```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

## Project Structure

```
autoops/
├── backend/           # Node.js Express backend
│   ├── prisma/        # Prisma schema and migrations
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   └── package.json
│
└── frontend/          # React Next.js frontend
    ├── src/
    │   ├── app/         # Next.js app router
    │   ├── components/  # React components
    │   └── lib/         # Utility functions
    └── package.json
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
