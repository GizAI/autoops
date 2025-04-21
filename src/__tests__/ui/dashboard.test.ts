import { Browser, Page } from 'puppeteer';
import { setupBrowser, teardownBrowser, takeScreenshot, waitForPageLoad, elementExists } from './setup';
import { logger } from '../../utils/logger';

describe('Dashboard UI Tests', () => {
  let browser: Browser;
  let page: Page;
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  // Set up browser before tests
  beforeAll(async () => {
    try {
      const setup = await setupBrowser();
      browser = setup.browser;
      page = setup.page;
    } catch (error) {
      logger.error('Error in beforeAll:', error);
      throw error;
    }
  });

  // Close browser after tests
  afterAll(async () => {
    await teardownBrowser();
  });

  // Take screenshot after each test if it fails
  afterEach(async function() {
    if ((this as any).currentTest?.state === 'failed') {
      await takeScreenshot(page, `failed-${(this as any).currentTest?.title}`);
    }
  });

  // Test login functionality
  test('User can log in to the dashboard', async () => {
    try {
      // Navigate to login page
      await page.goto(`${baseUrl}/login`);
      await waitForPageLoad(page);
      
      // Check if login form exists
      const loginFormExists = await elementExists(page, 'form');
      expect(loginFormExists).toBe(true);
      
      // Fill in login form
      await page.type('input[name="email"]', 'admin@giz.ai');
      await page.type('input[name="password"]', 'admin123');
      
      // Submit form
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' })
      ]);
      
      // Check if redirected to dashboard
      const currentUrl = page.url();
      expect(currentUrl).toContain('/dashboard');
      
      // Check if dashboard elements are present
      const dashboardTitle = await elementExists(page, 'h1');
      expect(dashboardTitle).toBe(true);
      
      // Take success screenshot
      await takeScreenshot(page, 'login-success');
    } catch (error) {
      logger.error('Login test error:', error);
      await takeScreenshot(page, 'login-error');
      throw error;
    }
  });

  // Test email list functionality
  test('Dashboard displays email list', async () => {
    try {
      // Navigate to emails page
      await page.goto(`${baseUrl}/dashboard/emails`);
      await waitForPageLoad(page);
      
      // Check if email list exists
      const emailListExists = await elementExists(page, 'table');
      expect(emailListExists).toBe(true);
      
      // Check if email items are present
      const emailItems = await page.$$('table tbody tr');
      logger.info(`Found ${emailItems.length} email items`);
      
      // Take success screenshot
      await takeScreenshot(page, 'email-list');
    } catch (error) {
      logger.error('Email list test error:', error);
      await takeScreenshot(page, 'email-list-error');
      throw error;
    }
  });

  // Test email detail view
  test('User can view email details', async () => {
    try {
      // Navigate to emails page
      await page.goto(`${baseUrl}/dashboard/emails`);
      await waitForPageLoad(page);
      
      // Check if email list exists and has items
      const emailItems = await page.$$('table tbody tr');
      if (emailItems.length > 0) {
        // Click on first email
        await Promise.all([
          emailItems[0].click(),
          page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
        
        // Check if redirected to email detail page
        const currentUrl = page.url();
        expect(currentUrl).toContain('/emails/');
        
        // Check if email detail elements are present
        const subjectExists = await elementExists(page, 'h2');
        expect(subjectExists).toBe(true);
        
        // Take success screenshot
        await takeScreenshot(page, 'email-detail');
      } else {
        logger.warn('No email items found to test detail view');
      }
    } catch (error) {
      logger.error('Email detail test error:', error);
      await takeScreenshot(page, 'email-detail-error');
      throw error;
    }
  });

  // Test response generation
  test('User can generate response for an email', async () => {
    try {
      // Navigate to emails page
      await page.goto(`${baseUrl}/dashboard/emails`);
      await waitForPageLoad(page);
      
      // Check if email list exists and has items
      const emailItems = await page.$$('table tbody tr');
      if (emailItems.length > 0) {
        // Click on first email
        await Promise.all([
          emailItems[0].click(),
          page.waitForNavigation({ waitUntil: 'networkidle0' })
        ]);
        
        // Check if generate response button exists
        const generateButtonExists = await elementExists(page, 'button:contains("Generate Response")');
        if (generateButtonExists) {
          // Click generate response button
          await Promise.all([
            page.click('button:contains("Generate Response")'),
            page.waitForResponse(response => response.url().includes('/api/responses/generate'))
          ]);
          
          // Check if response form appears
          const responseFormExists = await elementExists(page, 'textarea');
          expect(responseFormExists).toBe(true);
          
          // Take success screenshot
          await takeScreenshot(page, 'response-generation');
        } else {
          logger.warn('Generate response button not found');
        }
      } else {
        logger.warn('No email items found to test response generation');
      }
    } catch (error) {
      logger.error('Response generation test error:', error);
      await takeScreenshot(page, 'response-generation-error');
      throw error;
    }
  });
});
