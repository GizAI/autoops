# Test info

- Name: Authentication >> login with valid credentials
- Location: /home/user/autoops/tests/e2e/auth.spec.ts:33:7

# Error details

```
Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-xl font-bold text-blue-600">AutoOps</h1> aka getByRole('heading', { name: 'AutoOps' })
    2) <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1> aka getByRole('heading', { name: 'Dashboard' })

Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for locator('h1')

    at /home/user/autoops/tests/e2e/auth.spec.ts:61:29
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
  - heading "Dashboard" [level=1]
  - paragraph: Overview of your email automation system
  - button "Sync Emails"
  - img
  - term: Total Emails
  - definition: "0"
  - img
  - term: Pending Emails
  - definition: "0"
  - img
  - term: Processed Emails
  - definition: "0"
  - img
  - term: Draft Responses
  - definition: "0"
  - img
  - term: Sent Responses
  - definition: "0"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Authentication', () => {
   4 |   test('login page loads correctly', async ({ page }) => {
   5 |     // Navigate to login page
   6 |     await page.goto('/auth/login');
   7 |     
   8 |     // Check if login form exists
   9 |     const form = await page.locator('form');
  10 |     await expect(form).toBeVisible();
  11 |     
  12 |     // Check if email and password fields exist
  13 |     const emailInput = await page.locator('input[type="email"]');
  14 |     const passwordInput = await page.locator('input[type="password"]');
  15 |     const submitButton = await page.locator('button[type="submit"]');
  16 |     
  17 |     await expect(emailInput).toBeVisible();
  18 |     await expect(passwordInput).toBeVisible();
  19 |     await expect(submitButton).toBeVisible();
  20 |     
  21 |     // Capture any console errors
  22 |     const errors: string[] = [];
  23 |     page.on('console', msg => {
  24 |       if (msg.type() === 'error') {
  25 |         errors.push(`Console error: ${msg.text()}`);
  26 |       }
  27 |     });
  28 |     
  29 |     // Verify no console errors
  30 |     expect(errors).toEqual([]);
  31 |   });
  32 |   
  33 |   test('login with valid credentials', async ({ page }) => {
  34 |     // Navigate to login page
  35 |     await page.goto('/auth/login');
  36 |     
  37 |     // Fill login form
  38 |     await page.fill('input[type="email"]', 'test@example.com');
  39 |     await page.fill('input[type="password"]', 'password123');
  40 |     
  41 |     // Capture console logs
  42 |     const logs: string[] = [];
  43 |     page.on('console', msg => {
  44 |       logs.push(`${msg.type()}: ${msg.text()}`);
  45 |     });
  46 |     
  47 |     // Submit form
  48 |     await page.click('button[type="submit"]');
  49 |     
  50 |     // Wait for navigation or error
  51 |     try {
  52 |       // If login is successful, we should be redirected to dashboard
  53 |       await page.waitForURL('**/dashboard**', { timeout: 5000 });
  54 |       
  55 |       // Check if we're on the dashboard page
  56 |       const currentUrl = page.url();
  57 |       expect(currentUrl).toContain('/dashboard');
  58 |       
  59 |       // Check if dashboard elements are visible
  60 |       const heading = await page.locator('h1');
> 61 |       await expect(heading).toBeVisible();
     |                             ^ Error: expect.toBeVisible: Error: strict mode violation: locator('h1') resolved to 2 elements:
  62 |     } catch (error) {
  63 |       // If login fails, log the console output
  64 |       console.log('Console logs during login:', logs);
  65 |       
  66 |       // Take a screenshot for debugging
  67 |       await page.screenshot({ path: 'login-failure.png', fullPage: true });
  68 |       
  69 |       // Rethrow the error
  70 |       throw error;
  71 |     }
  72 |   });
  73 | });
  74 |
```