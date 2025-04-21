import { exec } from 'child_process';
import { logger } from '../utils/logger';
import axios from 'axios';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuration
const config = {
  checkIntervalMs: 5 * 60 * 1000, // 5 minutes
  frontendPort: 3000,
  backendPort: 3001,
  frontendUrl: 'http://localhost:3000',
  backendUrl: 'http://localhost:3001',
  apiEndpoints: [
    '/api/auth/login',
    '/api/emails',
    '/api/responses',
    '/api/knowledge'
  ]
};

// Check if a port is in use
async function isPortInUse(port: number): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`netstat -tulpn | grep ${port}`);
    return stdout.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Check if a server is responding
async function isServerResponding(url: string): Promise<boolean> {
  try {
    await axios.get(url, { timeout: 5000 });
    return true;
  } catch (error) {
    if (error.response) {
      // Server responded with an error code, but it's still responding
      return true;
    }
    return false;
  }
}

// Check API endpoints
async function checkApiEndpoints(): Promise<void> {
  for (const endpoint of config.apiEndpoints) {
    try {
      const url = `${config.backendUrl}${endpoint}`;
      await axios.get(url, { timeout: 5000 });
      logger.info(`API endpoint ${endpoint} is responding`);
    } catch (error) {
      if (error.response) {
        // Server responded with an error code, but it's still responding
        logger.info(`API endpoint ${endpoint} responded with status ${error.response.status}`);
      } else {
        logger.error(`API endpoint ${endpoint} is not responding: ${error.message}`);
      }
    }
  }
}

// Restart frontend server
async function restartFrontendServer(): Promise<void> {
  try {
    logger.info('Restarting frontend server...');
    await execAsync('cd /home/user/autoops/frontend && npm run dev -- -H 0.0.0.0 &');
    logger.info('Frontend server restarted');
  } catch (error) {
    logger.error('Failed to restart frontend server:', error);
  }
}

// Restart backend server
async function restartBackendServer(): Promise<void> {
  try {
    logger.info('Restarting backend server...');
    await execAsync('cd /home/user/autoops && PORT=3001 TS_NODE_TRANSPILE_ONLY=1 npm run dev &');
    logger.info('Backend server restarted');
  } catch (error) {
    logger.error('Failed to restart backend server:', error);
  }
}

// Main monitoring function
async function monitorServers(): Promise<void> {
  logger.info('Starting server monitoring...');
  
  try {
    // Check frontend server
    const isFrontendPortInUse = await isPortInUse(config.frontendPort);
    const isFrontendResponding = await isServerResponding(config.frontendUrl);
    
    if (!isFrontendPortInUse || !isFrontendResponding) {
      logger.error('Frontend server is not running or not responding');
      await restartFrontendServer();
    } else {
      logger.info('Frontend server is running and responding');
    }
    
    // Check backend server
    const isBackendPortInUse = await isPortInUse(config.backendPort);
    const isBackendResponding = await isServerResponding(config.backendUrl);
    
    if (!isBackendPortInUse || !isBackendResponding) {
      logger.error('Backend server is not running or not responding');
      await restartBackendServer();
    } else {
      logger.info('Backend server is running and responding');
      
      // Check API endpoints
      await checkApiEndpoints();
    }
  } catch (error) {
    logger.error('Error during server monitoring:', error);
  }
  
  // Schedule next check
  setTimeout(monitorServers, config.checkIntervalMs);
}

// Start monitoring
monitorServers()
  .then(() => {
    logger.info('Server monitoring started');
  })
  .catch((error) => {
    logger.error('Failed to start server monitoring:', error);
  });
