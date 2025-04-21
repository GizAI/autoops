import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ApiError } from './error.middleware';

/**
 * Middleware to check if user has required role
 * @param roles Array of roles that are allowed to access the route
 * @returns Middleware function
 */
export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request
      if (!req.user) {
        logger.warn('Access denied: No user found in request');
        throw new ApiError(401, 'Unauthorized - Authentication required');
      }

      // Check if user has required role
      if (!roles.includes(req.user.role)) {
        logger.warn(`Access denied: User ${req.user.id} with role ${req.user.role} attempted to access resource requiring roles: ${roles.join(', ')}`);
        throw new ApiError(403, 'Forbidden - Insufficient permissions');
      }

      // User has required role, proceed
      logger.debug(`Access granted: User ${req.user.id} with role ${req.user.role} accessed resource`);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user is an admin
 */
export const isAdmin = checkRole(['admin']);

/**
 * Middleware to check if user is accessing their own resource or is an admin
 * @param paramIdField The name of the parameter containing the user ID
 * @returns Middleware function
 */
export const isOwnerOrAdmin = (paramIdField: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user exists in request
      if (!req.user) {
        logger.warn('Access denied: No user found in request');
        throw new ApiError(401, 'Unauthorized - Authentication required');
      }

      // If user is admin, allow access
      if (req.user.role === 'admin') {
        logger.debug(`Access granted: Admin user ${req.user.id} accessed resource`);
        return next();
      }

      // Check if user is accessing their own resource
      const resourceUserId = parseInt(req.params[paramIdField]);
      if (isNaN(resourceUserId)) {
        logger.warn(`Invalid user ID parameter: ${req.params[paramIdField]}`);
        throw new ApiError(400, 'Bad Request - Invalid user ID');
      }

      if (req.user.id !== resourceUserId) {
        logger.warn(`Access denied: User ${req.user.id} attempted to access resource owned by user ${resourceUserId}`);
        throw new ApiError(403, 'Forbidden - You can only access your own resources');
      }

      // User is accessing their own resource, proceed
      logger.debug(`Access granted: User ${req.user.id} accessed their own resource`);
      next();
    } catch (error) {
      next(error);
    }
  };
};
