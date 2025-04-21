import { spawn } from 'child_process';
import { logger } from '../utils/logger';
import fs from 'fs';
import path from 'path';

/**
 * Run tests and handle results
 */
async function runTests() {
  try {
    logger.info('Starting automated tests...');
    
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Create test results directory if it doesn't exist
    const resultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    // Run API tests
    logger.info('Running API tests...');
    const apiTestResult = await runCommand('npm', ['run', 'test:api', '--', '--json', '--outputFile=test-results/api-results.json']);
    
    if (apiTestResult.success) {
      logger.info('API tests completed successfully');
    } else {
      logger.error('API tests failed:', apiTestResult.error);
    }
    
    // Run UI tests
    logger.info('Running UI tests...');
    const uiTestResult = await runCommand('npm', ['run', 'test:ui', '--', '--json', '--outputFile=test-results/ui-results.json']);
    
    if (uiTestResult.success) {
      logger.info('UI tests completed successfully');
    } else {
      logger.error('UI tests failed:', uiTestResult.error);
    }
    
    // Analyze test results
    const apiResults = readJsonFile(path.join(resultsDir, 'api-results.json'));
    const uiResults = readJsonFile(path.join(resultsDir, 'ui-results.json'));
    
    const apiTestsPassed = apiResults ? apiResults.numPassedTests === apiResults.numTotalTests : false;
    const uiTestsPassed = uiResults ? uiResults.numPassedTests === uiResults.numTotalTests : false;
    
    if (apiTestsPassed && uiTestsPassed) {
      logger.info('All tests passed successfully!');
    } else {
      logger.warn('Some tests failed. Check test results for details.');
      
      // Log failed tests
      if (apiResults && apiResults.testResults) {
        logFailedTests(apiResults.testResults, 'API');
      }
      
      if (uiResults && uiResults.testResults) {
        logFailedTests(uiResults.testResults, 'UI');
      }
    }
    
    // Return overall test status
    return apiTestsPassed && uiTestsPassed;
  } catch (error) {
    logger.error('Error running tests:', error);
    return false;
  }
}

/**
 * Run a command and return the result
 */
function runCommand(command: string, args: string[]): Promise<{ success: boolean; error?: any }> {
  return new Promise((resolve) => {
    const process = spawn(command, args, { stdio: 'inherit' });
    
    process.on('close', (code) => {
      if (code === 0) {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: `Process exited with code ${code}` });
      }
    });
    
    process.on('error', (error) => {
      resolve({ success: false, error });
    });
  });
}

/**
 * Read a JSON file and return its contents
 */
function readJsonFile(filePath: string): any {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
    return null;
  } catch (error) {
    logger.error(`Error reading JSON file ${filePath}:`, error);
    return null;
  }
}

/**
 * Log failed tests
 */
function logFailedTests(testResults: any[], type: string) {
  for (const result of testResults) {
    if (result.status === 'failed') {
      logger.warn(`Failed ${type} test: ${result.name}`);
      
      if (result.assertionResults) {
        for (const assertion of result.assertionResults) {
          if (assertion.status === 'failed') {
            logger.warn(`  - ${assertion.fullName}: ${assertion.failureMessages.join('\n')}`);
          }
        }
      }
    }
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  runTests()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      logger.error('Test execution failed:', error);
      process.exit(1);
    });
}

export { runTests };
