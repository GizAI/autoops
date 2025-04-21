import { test, expect } from '@playwright/test';

// Helper function to get auth token
async function getAuthToken(request) {
  const response = await request.post('http://localhost:3001/api/auth/login', {
    data: {
      email: 'test@example.com',
      password: 'password123'
    }
  });
  
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  return data.token;
}

test.describe('API Endpoints', () => {
  let authToken: string;
  
  test.beforeAll(async ({ request }) => {
    try {
      authToken = await getAuthToken(request);
    } catch (error) {
      console.log('Failed to get auth token:', error);
      // Continue without token, tests will fail but provide useful information
    }
  });
  
  test('auth endpoint returns token', async ({ request }) => {
    const response = await request.post('http://localhost:3001/api/auth/login', {
      data: {
        email: 'test@example.com',
        password: 'password123'
      }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('user');
    expect(data.user).toHaveProperty('email', 'test@example.com');
  });
  
  test('emails endpoint requires authentication', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/emails/processed');
    
    // Should return 401 Unauthorized without token
    expect(response.status()).toBe(401);
  });
  
  test('emails endpoint returns data with auth', async ({ request }) => {
    // Skip if no auth token
    test.skip(!authToken, 'No auth token available');
    
    const response = await request.get('http://localhost:3001/api/emails/processed', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
  
  test('responses endpoint requires authentication', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/responses');
    
    // Should return 401 Unauthorized without token
    expect(response.status()).toBe(401);
  });
  
  test('responses endpoint returns data with auth', async ({ request }) => {
    // Skip if no auth token
    test.skip(!authToken, 'No auth token available');
    
    const response = await request.get('http://localhost:3001/api/responses', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
  
  test('knowledge endpoint requires authentication', async ({ request }) => {
    const response = await request.get('http://localhost:3001/api/knowledge');
    
    // Should return 401 Unauthorized without token
    expect(response.status()).toBe(401);
  });
  
  test('knowledge endpoint returns data with auth', async ({ request }) => {
    // Skip if no auth token
    test.skip(!authToken, 'No auth token available');
    
    const response = await request.get('http://localhost:3001/api/knowledge', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
});
