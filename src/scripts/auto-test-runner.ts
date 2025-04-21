import { runTests } from './run-tests';
import { analyzeAndFixTests } from './fix-tests';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

/**
 * Continuously monitor for code changes and run tests automatically
 */
async function monitorAndTest() {
  try {
    logger.info('Starting automated test monitoring...');
    
    // Track last modified times
    const lastModifiedTimes = new Map<string, number>();
    
    // Initial scan of files
    updateLastModifiedTimes(lastModifiedTimes);
    
    // Run tests initially
    await runTests();
    
    // Set up interval to check for changes
    setInterval(async () => {
      const hasChanges = checkForChanges(lastModifiedTimes);
      
      if (hasChanges) {
        logger.info('Code changes detected. Running tests...');
        
        // Run tests
        const success = await runTests();
        
        if (!success) {
          logger.warn('Tests failed. Attempting to fix issues...');
          await analyzeAndFixTests();
        }
        
        // Update last modified times after tests
        updateLastModifiedTimes(lastModifiedTimes);
      }
    }, 10000); // Check every 10 seconds
    
    logger.info('Automated test monitoring is active. Press Ctrl+C to stop.');
  } catch (error) {
    logger.error('Error in test monitoring:', error);
  }
}

/**
 * Update the map of last modified times for all relevant files
 */
function updateLastModifiedTimes(lastModifiedTimes: Map<string, number>) {
  const directories = ['src', 'prisma'];
  
  for (const dir of directories) {
    scanDirectory(dir, lastModifiedTimes);
  }
}

/**
 * Scan a directory recursively and update last modified times
 */
function scanDirectory(directory: string, lastModifiedTimes: Map<string, number>) {
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      // Skip node_modules and other irrelevant directories
      if (entry.isDirectory()) {
        if (!['node_modules', 'dist', '.git', 'screenshots', 'test-results'].includes(entry.name)) {
          scanDirectory(fullPath, lastModifiedTimes);
        }
      } else if (entry.isFile() && isRelevantFile(entry.name)) {
        const stats = fs.statSync(fullPath);
        lastModifiedTimes.set(fullPath, stats.mtimeMs);
      }
    }
  } catch (error) {
    logger.error(`Error scanning directory ${directory}:`, error);
  }
}

/**
 * Check if a file is relevant for monitoring
 */
function isRelevantFile(filename: string): boolean {
  const relevantExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.prisma'];
  const extension = path.extname(filename);
  return relevantExtensions.includes(extension);
}

/**
 * Check for changes in monitored files
 */
function checkForChanges(lastModifiedTimes: Map<string, number>): boolean {
  let hasChanges = false;
  
  for (const [filePath, lastModified] of lastModifiedTimes.entries()) {
    try {
      const stats = fs.statSync(filePath);
      if (stats.mtimeMs > lastModified) {
        logger.info(`File changed: ${filePath}`);
        lastModifiedTimes.set(filePath, stats.mtimeMs);
        hasChanges = true;
      }
    } catch (error) {
      // File might have been deleted
      lastModifiedTimes.delete(filePath);
      hasChanges = true;
    }
  }
  
  // Check for new files
  const newLastModifiedTimes = new Map<string, number>();
  updateLastModifiedTimes(newLastModifiedTimes);
  
  for (const [filePath, lastModified] of newLastModifiedTimes.entries()) {
    if (!lastModifiedTimes.has(filePath)) {
      logger.info(`New file detected: ${filePath}`);
      lastModifiedTimes.set(filePath, lastModified);
      hasChanges = true;
    }
  }
  
  return hasChanges;
}

// Run the monitoring if this script is executed directly
if (require.main === module) {
  monitorAndTest().catch((error) => {
    logger.error('Test monitoring failed:', error);
    process.exit(1);
  });
}

export { monitorAndTest };
