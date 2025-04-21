import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page loads correctly', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login');

    // Check if login form exists
    const form = await page.locator('form');
    await expect(form).toBeVisible();

    // Check if email and password fields exist
    const emailInput = await page.locator('input[type="email"]');
    const passwordInput = await page.locator('input[type="password"]');
    const submitButton = await page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Capture any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    // Verify no console errors
    expect(errors).toEqual([]);
  });

  test('login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login');

    // Fill login form
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Capture console logs
    const logs: string[] = [];
    page.on('console', msg => {
      logs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for navigation or error
    try {
      // If login is successful, we should be redirected to dashboard
      await page.waitForURL('**/dashboard**', { timeout: 5000 });

      // Check if we're on the dashboard page
      const currentUrl = page.url();
      expect(currentUrl).toContain('/dashboard');

      // Check if dashboard elements are visible
      const heading = await page.locator('h1.text-2xl');
      await expect(heading).toBeVisible();
    } catch (error) {
      // If login fails, log the console output
      console.log('Console logs during login:', logs);

      // Take a screenshot for debugging
      await page.screenshot({ path: 'login-failure.png', fullPage: true });

      // Rethrow the error
      throw error;
    }
  });
});
