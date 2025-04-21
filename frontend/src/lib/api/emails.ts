import apiClient from './client';

export interface Email {
  id: number;
  messageId: string;
  threadId: string;
  fromEmail: string;
  subject: string;
  receivedAt: string;
  status: 'pending' | 'processed' | 'responded';
  language: string;
}

export interface EmailThread {
  threadId: string;
  messages: EmailMessage[];
}

export interface EmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}

/**
 * Get all processed emails
 */
export const getEmails = async (): Promise<Email[]> => {
  const response = await apiClient.get<Email[]>('/emails/processed');
  return response.data;
};

/**
 * Get email by ID
 */
export const getEmailById = async (id: number): Promise<Email> => {
  const response = await apiClient.get<Email>(`/emails/processed/${id}`);
  return response.data;
};

/**
 * Get email thread by thread ID
 */
export const getEmailThread = async (threadId: string): Promise<EmailThread> => {
  const response = await apiClient.get<EmailThread>(`/emails/thread/${threadId}`);
  return response.data;
};

/**
 * Sync emails from Gmail
 */
export const syncEmails = async (): Promise<{ message: string; emails: Email[] }> => {
  const response = await apiClient.get<{ message: string; emails: Email[] }>('/emails/sync');
  return response.data;
};

/**
 * Set up Gmail webhook
 */
export const setupGmailWebhook = async (): Promise<{ message: string; historyId: string; verificationToken: string }> => {
  const response = await apiClient.post<{ message: string; historyId: string; verificationToken: string }>('/emails/setup-webhook');
  return response.data;
};
