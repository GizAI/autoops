import { test, expect } from '@playwright/test';

// Helper function to login
async function login(page) {
  await page.goto('/auth/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button[type="submit"]');

  try {
    await page.waitForURL('**/dashboard**', { timeout: 5000 });
  } catch (error) {
    console.log('Login failed, taking screenshot for debugging');
    await page.screenshot({ path: 'login-failure-dashboard-test.png', fullPage: true });
    throw error;
  }
}

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page);
  });

  test('dashboard page loads correctly', async ({ page }) => {
    // Check if dashboard elements are visible
    const heading = await page.locator('h1.text-2xl');
    await expect(heading).toBeVisible();

    // Capture any console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(`Console error: ${msg.text()}`);
      }
    });

    // Check for stats cards
    const statsCards = await page.locator('.bg-white.overflow-hidden.shadow.rounded-lg');
    expect(await statsCards.count()).toBeGreaterThan(0);

    // Verify no console errors
    expect(errors).toEqual([]);
  });

  test('navigation to emails page works', async ({ page }) => {
    // Click on emails link in sidebar
    await page.click('a[href="/dashboard/emails"]');

    // Wait for navigation
    await page.waitForURL('**/dashboard/emails**');

    // Check if emails page elements are visible
    const heading = await page.locator('h1.text-2xl');
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toContain('Emails');

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

  test('navigation to responses page works', async ({ page }) => {
    // Click on responses link in sidebar
    await page.click('a[href="/dashboard/responses"]');

    // Wait for navigation
    await page.waitForURL('**/dashboard/responses**');

    // Check if responses page elements are visible
    const heading = await page.locator('h1.text-2xl');
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toContain('Responses');

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

  test('navigation to knowledge base page works', async ({ page }) => {
    // Click on knowledge base link in sidebar
    await page.click('a[href="/dashboard/knowledge"]');

    // Wait for navigation
    await page.waitForURL('**/dashboard/knowledge**');

    // Check if knowledge base page elements are visible
    const heading = await page.locator('h1.text-2xl');
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toContain('Knowledge Base');

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
});
