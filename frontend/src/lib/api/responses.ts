import apiClient from './client';

export interface Response {
  id: number;
  emailId: number;
  threadId: string;
  content: string;
  status: 'draft' | 'sent';
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
}

/**
 * Get all responses
 */
export const getResponses = async (): Promise<Response[]> => {
  const response = await apiClient.get<Response[]>('/responses');
  return response.data;
};

/**
 * Get draft responses
 */
export const getDraftResponses = async (): Promise<Response[]> => {
  const response = await apiClient.get<Response[]>('/responses/drafts');
  return response.data;
};

/**
 * Get response by ID
 */
export const getResponseById = async (id: number): Promise<Response> => {
  const response = await apiClient.get<Response>(`/responses/${id}`);
  return response.data;
};

/**
 * Generate response for an email
 */
export const generateResponse = async (emailId: number): Promise<Response> => {
  const response = await apiClient.post<Response>('/responses/generate', { emailId });
  return response.data;
};

/**
 * Update response
 */
export const updateResponse = async (id: number, content: string): Promise<Response> => {
  const response = await apiClient.put<Response>(`/responses/${id}`, { content });
  return response.data;
};

/**
 * Update response status
 */
export const updateResponseStatus = async (id: number, status: 'draft' | 'sent'): Promise<Response> => {
  const response = await apiClient.put<Response>(`/responses/${id}/status`, { status });
  return response.data;
};

/**
 * Send response
 */
export const sendResponse = async (id: number): Promise<Response> => {
  const response = await apiClient.post<Response>(`/responses/${id}/send`);
  return response.data;
};
