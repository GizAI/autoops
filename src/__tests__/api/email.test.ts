import request from 'supertest';
import app from '../../index';
import { prisma } from '../../index';

// Mock the Gmail API and other external services
jest.mock('googleapis', () => {
  return {
    google: {
      gmail: () => ({
        users: {
          messages: {
            list: jest.fn().mockResolvedValue({
              data: {
                messages: [
                  { id: 'test-message-id-1' },
                  { id: 'test-message-id-2' }
                ]
              }
            }),
            get: jest.fn().mockResolvedValue({
              data: {
                id: 'test-message-id-1',
                threadId: 'test-thread-id',
                internalDate: '1619712000000',
                payload: {
                  headers: [
                    { name: 'Subject', value: 'Test Subject' },
                    { name: 'From', value: 'test@example.com' },
                    { name: 'To', value: 'support@giz.ai' }
                  ],
                  parts: [
                    {
                      mimeType: 'text/plain',
                      body: {
                        data: Buffer.from('Test email body').toString('base64')
                      }
                    }
                  ]
                }
              }
            }),
            modify: jest.fn().mockResolvedValue({})
          },
          threads: {
            get: jest.fn().mockResolvedValue({
              data: {
                messages: [
                  {
                    id: 'test-message-id-1',
                    threadId: 'test-thread-id',
                    snippet: 'Test snippet',
                    payload: {
                      headers: [
                        { name: 'Subject', value: 'Test Subject' },
                        { name: 'From', value: 'test@example.com' },
                        { name: 'To', value: 'support@giz.ai' },
                        { name: 'Date', value: 'Wed, 28 Apr 2021 12:00:00 +0000' }
                      ],
                      parts: [
                        {
                          mimeType: 'text/plain',
                          body: {
                            data: Buffer.from('Test email body').toString('base64')
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            })
          },
          history: {
            list: jest.fn().mockResolvedValue({
              data: {
                history: []
              }
            })
          },
          watch: jest.fn().mockResolvedValue({
            data: {
              historyId: '12345',
              expiration: '1619798400000'
            }
          })
        }
      }),
      auth: {
        OAuth2: jest.fn().mockImplementation(() => ({
          setCredentials: jest.fn()
        }))
      }
    }
  };
});

// Mock the language detection
jest.mock('../../utils/language', () => ({
  detectLanguage: jest.fn().mockReturnValue('en')
}));

// Mock environment variables
process.env.GMAIL_REFRESH_TOKEN = 'test-refresh-token';
process.env.SUPPORT_EMAIL = 'support@giz.ai';

describe('Email API Endpoints', () => {
  // Clear database before each test
  beforeEach(async () => {
    await prisma.processedEmail.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/emails', () => {
    it('should return an array of emails', async () => {
      // Create a test email in the database
      await prisma.processedEmail.create({
        data: {
          messageId: 'test-message-id',
          threadId: 'test-thread-id',
          fromEmail: 'test@example.com',
          subject: 'Test Subject',
          receivedAt: new Date(),
          status: 'pending'
        }
      });

      const response = await request(app)
        .get('/api/emails')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('messageId', 'test-message-id');
    });
  });

  describe('GET /api/emails/:id', () => {
    it('should return a single email by ID', async () => {
      // Create a test email in the database
      const email = await prisma.processedEmail.create({
        data: {
          messageId: 'test-message-id',
          threadId: 'test-thread-id',
          fromEmail: 'test@example.com',
          subject: 'Test Subject',
          receivedAt: new Date(),
          status: 'pending'
        }
      });

      const response = await request(app)
        .get(`/api/emails/${email.id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('id', email.id);
      expect(response.body).toHaveProperty('messageId', 'test-message-id');
    });

    it('should return 404 for non-existent email ID', async () => {
      await request(app)
        .get('/api/emails/9999')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe('POST /api/emails/sync', () => {
    it('should sync emails from Gmail', async () => {
      const response = await request(app)
        .post('/api/emails/sync')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('emails');
      expect(Array.isArray(response.body.emails)).toBe(true);
    });
  });

  describe('GET /api/emails/thread/:threadId', () => {
    it('should return emails in a thread', async () => {
      const response = await request(app)
        .get('/api/emails/thread/test-thread-id')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('threadId', 'test-thread-id');
      expect(response.body).toHaveProperty('messages');
      expect(Array.isArray(response.body.messages)).toBe(true);
    });
  });

  describe('POST /api/emails/webhook', () => {
    it('should process Gmail push notifications', async () => {
      const response = await request(app)
        .post('/api/emails/webhook')
        .send({
          message: {
            data: Buffer.from(JSON.stringify({
              emailAddress: 'support@giz.ai',
              historyId: '12345'
            })).toString('base64')
          }
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
    });
  });

  describe('POST /api/emails/setup-webhook', () => {
    it('should set up Gmail push notifications', async () => {
      const response = await request(app)
        .post('/api/emails/setup-webhook')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('historyId');
      expect(response.body).toHaveProperty('verificationToken');
    });
  });
});
