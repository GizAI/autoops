import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { PrismaClient } from './generated/prisma';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize express app
const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
// Configure CORS
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routes
import emailRoutes from './routes/email.routes';
import knowledgeRoutes from './routes/knowledge.routes';
import responseRoutes from './routes/response.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Use routes
app.use('/api/emails', emailRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to AutoOps API' });
});

// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as AppError;
  error.status = 404;
  next(error);
});

// Error handling middleware
interface AppError extends Error {
  status?: number;
}

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  // Log error details
  logger.error(`${err.status || 500} - ${err.message}`, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: err.stack
  });

  // Send error response
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Rejection:', err);
});

// Handle server shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
  });

  // Close Prisma connection
  await prisma.$disconnect();
});

export default app; // Export for testing
