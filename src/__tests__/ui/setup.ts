import { launch, Browser, Page } from 'puppeteer';
import { logger } from '../../utils/logger';

let browser: Browser;
let page: Page;

// Setup function to initialize browser and page
export async function setupBrowser(): Promise<{ browser: Browser; page: Page }> {
  try {
    browser = await launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({ width: 1280, height: 800 });
    
    // Add console log listener
    page.on('console', (msg) => {
      logger.info(`Browser console [${msg.type()}]: ${msg.text()}`);
    });
    
    return { browser, page };
  } catch (error) {
    logger.error('Error setting up browser:', error);
    throw error;
  }
}

// Teardown function to close browser
export async function teardownBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
  }
}

// Helper function to take screenshot
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  try {
    await page.screenshot({ 
      path: `screenshots/${name}-${new Date().toISOString().replace(/:/g, '-')}.png`,
      fullPage: true
    });
  } catch (error) {
    logger.error(`Error taking screenshot ${name}:`, error);
  }
}

// Helper function to wait for navigation and network idle
export async function waitForPageLoad(page: Page, timeout = 30000): Promise<void> {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0', timeout }),
    page.waitForSelector('body', { timeout })
  ]);
}

// Helper function to check if element exists
export async function elementExists(page: Page, selector: string, timeout = 5000): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout });
    return true;
  } catch (error) {
    return false;
  }
}

// Helper function to retry an action
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxRetries: number; delay: number; onRetry?: (attempt: number, error: Error) => void }
): Promise<T> {
  const { maxRetries, delay, onRetry } = options;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      if (onRetry) {
        onRetry(attempt, error as Error);
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Retry failed');
}
