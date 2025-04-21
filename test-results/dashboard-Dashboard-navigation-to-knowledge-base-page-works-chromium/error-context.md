# Test info

- Name: Dashboard >> navigation to knowledge base page works
- Location: /home/user/autoops/tests/e2e/dashboard.spec.ts:94:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/dashboard**" until "load"
============================================================
    at login (/home/user/autoops/tests/e2e/dashboard.spec.ts:11:16)
    at /home/user/autoops/tests/e2e/dashboard.spec.ts:22:5
```

# Page snapshot

```yaml
- heading "AutoOps" [level=1]
- paragraph: AI-powered email automation system
- heading "Login to AutoOps" [level=2]
- text: Login failed. Please try again. Email
- textbox "Email": test@example.com
- text: Password
- textbox "Password": password123
- button "Login"
- alert
- button "Open Next.js Dev Tools":
  - img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Helper function to login
   4 | async function login(page) {
   5 |   await page.goto('/auth/login');
   6 |   await page.fill('input[type="email"]', 'test@example.com');
   7 |   await page.fill('input[type="password"]', 'password123');
   8 |   await page.click('button[type="submit"]');
   9 |
   10 |   try {
>  11 |     await page.waitForURL('**/dashboard**', { timeout: 5000 });
      |                ^ TimeoutError: page.waitForURL: Timeout 5000ms exceeded.
   12 |   } catch (error) {
   13 |     console.log('Login failed, taking screenshot for debugging');
   14 |     await page.screenshot({ path: 'login-failure-dashboard-test.png', fullPage: true });
   15 |     throw error;
   16 |   }
   17 | }
   18 |
   19 | test.describe('Dashboard', () => {
   20 |   test.beforeEach(async ({ page }) => {
   21 |     // Login before each test
   22 |     await login(page);
   23 |   });
   24 |
   25 |   test('dashboard page loads correctly', async ({ page }) => {
   26 |     // Check if dashboard elements are visible
   27 |     const heading = await page.locator('h1.text-2xl');
   28 |     await expect(heading).toBeVisible();
   29 |
   30 |     // Capture any console errors
   31 |     const errors: string[] = [];
   32 |     page.on('console', msg => {
   33 |       if (msg.type() === 'error') {
   34 |         errors.push(`Console error: ${msg.text()}`);
   35 |       }
   36 |     });
   37 |
   38 |     // Check for stats cards
   39 |     const statsCards = await page.locator('.bg-white.overflow-hidden.shadow.rounded-lg');
   40 |     expect(await statsCards.count()).toBeGreaterThan(0);
   41 |
   42 |     // Verify no console errors
   43 |     expect(errors).toEqual([]);
   44 |   });
   45 |
   46 |   test('navigation to emails page works', async ({ page }) => {
   47 |     // Click on emails link in sidebar
   48 |     await page.click('a[href="/dashboard/emails"]');
   49 |
   50 |     // Wait for navigation
   51 |     await page.waitForURL('**/dashboard/emails**');
   52 |
   53 |     // Check if emails page elements are visible
   54 |     const heading = await page.locator('h1.text-2xl');
   55 |     await expect(heading).toBeVisible();
   56 |     expect(await heading.textContent()).toContain('Emails');
   57 |
   58 |     // Capture any console errors
   59 |     const errors: string[] = [];
   60 |     page.on('console', msg => {
   61 |       if (msg.type() === 'error') {
   62 |         errors.push(`Console error: ${msg.text()}`);
   63 |       }
   64 |     });
   65 |
   66 |     // Verify no console errors
   67 |     expect(errors).toEqual([]);
   68 |   });
   69 |
   70 |   test('navigation to responses page works', async ({ page }) => {
   71 |     // Click on responses link in sidebar
   72 |     await page.click('a[href="/dashboard/responses"]');
   73 |
   74 |     // Wait for navigation
   75 |     await page.waitForURL('**/dashboard/responses**');
   76 |
   77 |     // Check if responses page elements are visible
   78 |     const heading = await page.locator('h1.text-2xl');
   79 |     await expect(heading).toBeVisible();
   80 |     expect(await heading.textContent()).toContain('Responses');
   81 |
   82 |     // Capture any console errors
   83 |     const errors: string[] = [];
   84 |     page.on('console', msg => {
   85 |       if (msg.type() === 'error') {
   86 |         errors.push(`Console error: ${msg.text()}`);
   87 |       }
   88 |     });
   89 |
   90 |     // Verify no console errors
   91 |     expect(errors).toEqual([]);
   92 |   });
   93 |
   94 |   test('navigation to knowledge base page works', async ({ page }) => {
   95 |     // Click on knowledge base link in sidebar
   96 |     await page.click('a[href="/dashboard/knowledge"]');
   97 |
   98 |     // Wait for navigation
   99 |     await page.waitForURL('**/dashboard/knowledge**');
  100 |
  101 |     // Check if knowledge base page elements are visible
  102 |     const heading = await page.locator('h1.text-2xl');
  103 |     await expect(heading).toBeVisible();
  104 |     expect(await heading.textContent()).toContain('Knowledge Base');
  105 |
  106 |     // Capture any console errors
  107 |     const errors: string[] = [];
  108 |     page.on('console', msg => {
  109 |       if (msg.type() === 'error') {
  110 |         errors.push(`Console error: ${msg.text()}`);
  111 |       }
```