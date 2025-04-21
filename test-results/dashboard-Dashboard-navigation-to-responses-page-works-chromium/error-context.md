# Test info

- Name: Dashboard >> navigation to responses page works
- Location: /home/user/autoops/tests/e2e/dashboard.spec.ts:70:7

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-xl font-bold text-blue-600">AutoOps</h1> aka getByRole('heading', { name: 'AutoOps' })
    2) <h1 class="text-2xl font-bold text-gray-900">Email Responses</h1> aka getByRole('heading', { name: 'Email Responses' })

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('h1')

    at /home/user/autoops/tests/e2e/dashboard.spec.ts:79:27
```

# Page snapshot

```yaml
- alert: Dashboard - AutoOps
- button "Open Next.js Dev Tools":
  - img
- button "Open issues overlay": 1 Issue
- button "Collapse issues badge":
  - img
- heading "AutoOps" [level=1]
- paragraph
- paragraph
- navigation:
  - link "Dashboard":
    - /url: /dashboard
  - link "Emails":
    - /url: /dashboard/emails
  - link "Responses":
    - /url: /dashboard/responses
  - link "Knowledge Base":
    - /url: /dashboard/knowledge
- button "Logout":
  - img
  - text: Logout
- main:
  - heading "Email Responses" [level=1]
  - paragraph: Manage your email responses
  - paragraph: No responses found. Generate responses from the emails page.
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
   11 |     await page.waitForURL('**/dashboard**', { timeout: 5000 });
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
   27 |     const heading = await page.locator('h1');
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
   54 |     const heading = await page.locator('h1');
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
   78 |     const heading = await page.locator('h1');
>  79 |     await expect(heading).toBeVisible();
      |                           ^ Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 2 elements:
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
  102 |     const heading = await page.locator('h1');
  103 |     await expect(heading).toBeVisible();
  104 |     expect(await heading.textContent()).toContain('Knowledge Base');
  105 |     
  106 |     // Capture any console errors
  107 |     const errors: string[] = [];
  108 |     page.on('console', msg => {
  109 |       if (msg.type() === 'error') {
  110 |         errors.push(`Console error: ${msg.text()}`);
  111 |       }
  112 |     });
  113 |     
  114 |     // Verify no console errors
  115 |     expect(errors).toEqual([]);
  116 |   });
  117 | });
  118 |
```