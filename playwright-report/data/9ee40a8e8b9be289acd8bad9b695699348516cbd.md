# Test info

- Name: API Endpoints >> emails endpoint requires authentication
- Location: /home/user/autoops/tests/e2e/api.spec.ts:44:7

# Error details

```
Error: apiRequestContext.get: connect ECONNREFUSED 127.0.0.1:3001
Call log:
  - → GET http://localhost:3001/api/emails/processed
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.25 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

    at /home/user/autoops/tests/e2e/api.spec.ts:45:36
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Helper function to get auth token
   4 | async function getAuthToken(request) {
   5 |   const response = await request.post('http://localhost:3001/api/auth/login', {
   6 |     data: {
   7 |       email: 'test@example.com',
   8 |       password: 'password123'
   9 |     }
   10 |   });
   11 |   
   12 |   expect(response.ok()).toBeTruthy();
   13 |   const data = await response.json();
   14 |   return data.token;
   15 | }
   16 |
   17 | test.describe('API Endpoints', () => {
   18 |   let authToken: string;
   19 |   
   20 |   test.beforeAll(async ({ request }) => {
   21 |     try {
   22 |       authToken = await getAuthToken(request);
   23 |     } catch (error) {
   24 |       console.log('Failed to get auth token:', error);
   25 |       // Continue without token, tests will fail but provide useful information
   26 |     }
   27 |   });
   28 |   
   29 |   test('auth endpoint returns token', async ({ request }) => {
   30 |     const response = await request.post('http://localhost:3001/api/auth/login', {
   31 |       data: {
   32 |         email: 'test@example.com',
   33 |         password: 'password123'
   34 |       }
   35 |     });
   36 |     
   37 |     expect(response.status()).toBe(200);
   38 |     const data = await response.json();
   39 |     expect(data).toHaveProperty('token');
   40 |     expect(data).toHaveProperty('user');
   41 |     expect(data.user).toHaveProperty('email', 'test@example.com');
   42 |   });
   43 |   
   44 |   test('emails endpoint requires authentication', async ({ request }) => {
>  45 |     const response = await request.get('http://localhost:3001/api/emails/processed');
      |                                    ^ Error: apiRequestContext.get: connect ECONNREFUSED 127.0.0.1:3001
   46 |     
   47 |     // Should return 401 Unauthorized without token
   48 |     expect(response.status()).toBe(401);
   49 |   });
   50 |   
   51 |   test('emails endpoint returns data with auth', async ({ request }) => {
   52 |     // Skip if no auth token
   53 |     test.skip(!authToken, 'No auth token available');
   54 |     
   55 |     const response = await request.get('http://localhost:3001/api/emails/processed', {
   56 |       headers: {
   57 |         'Authorization': `Bearer ${authToken}`
   58 |       }
   59 |     });
   60 |     
   61 |     expect(response.status()).toBe(200);
   62 |     const data = await response.json();
   63 |     expect(Array.isArray(data)).toBeTruthy();
   64 |   });
   65 |   
   66 |   test('responses endpoint requires authentication', async ({ request }) => {
   67 |     const response = await request.get('http://localhost:3001/api/responses');
   68 |     
   69 |     // Should return 401 Unauthorized without token
   70 |     expect(response.status()).toBe(401);
   71 |   });
   72 |   
   73 |   test('responses endpoint returns data with auth', async ({ request }) => {
   74 |     // Skip if no auth token
   75 |     test.skip(!authToken, 'No auth token available');
   76 |     
   77 |     const response = await request.get('http://localhost:3001/api/responses', {
   78 |       headers: {
   79 |         'Authorization': `Bearer ${authToken}`
   80 |       }
   81 |     });
   82 |     
   83 |     expect(response.status()).toBe(200);
   84 |     const data = await response.json();
   85 |     expect(Array.isArray(data)).toBeTruthy();
   86 |   });
   87 |   
   88 |   test('knowledge endpoint requires authentication', async ({ request }) => {
   89 |     const response = await request.get('http://localhost:3001/api/knowledge');
   90 |     
   91 |     // Should return 401 Unauthorized without token
   92 |     expect(response.status()).toBe(401);
   93 |   });
   94 |   
   95 |   test('knowledge endpoint returns data with auth', async ({ request }) => {
   96 |     // Skip if no auth token
   97 |     test.skip(!authToken, 'No auth token available');
   98 |     
   99 |     const response = await request.get('http://localhost:3001/api/knowledge', {
  100 |       headers: {
  101 |         'Authorization': `Bearer ${authToken}`
  102 |       }
  103 |     });
  104 |     
  105 |     expect(response.status()).toBe(200);
  106 |     const data = await response.json();
  107 |     expect(Array.isArray(data)).toBeTruthy();
  108 |   });
  109 | });
  110 |
```