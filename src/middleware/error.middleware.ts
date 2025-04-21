import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Not found error handler middleware
 * This middleware is used to handle 404 errors for routes that don't exist
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Global error handler middleware
 * This middleware is used to handle all errors that occur in the application
 */
export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
  // Log the error
  logger.error(`Error: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Determine status code
  const statusCode = 'statusCode' in err ? err.statusCode : 500;

  // Send error response
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    timestamp: new Date().toISOString()
  });
};

/**
 * Async handler to catch errors in async route handlers
 * This function wraps async route handlers to catch errors and pass them to the error handler
 */
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Create a new API error
 */
export const createError = (statusCode: number, message: string): ApiError => {
  return new ApiError(statusCode, message);
};
