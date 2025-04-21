import apiClient from './client';

export interface KnowledgeItem {
  id: number;
  content: string;
  source: string;
  category: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  id: number;
  content: string;
  source: string;
  category: string;
  language: string;
  similarity: number;
}

/**
 * Get all knowledge items
 */
export const getKnowledgeItems = async (): Promise<KnowledgeItem[]> => {
  const response = await apiClient.get<KnowledgeItem[]>('/knowledge');
  return response.data;
};

/**
 * Get knowledge item by ID
 */
export const getKnowledgeItemById = async (id: number): Promise<KnowledgeItem> => {
  const response = await apiClient.get<KnowledgeItem>(`/knowledge/${id}`);
  return response.data;
};

/**
 * Create knowledge item
 */
export const createKnowledgeItem = async (data: Omit<KnowledgeItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<KnowledgeItem> => {
  const response = await apiClient.post<KnowledgeItem>('/knowledge', data);
  return response.data;
};

/**
 * Update knowledge item
 */
export const updateKnowledgeItem = async (id: number, data: Partial<Omit<KnowledgeItem, 'id' | 'createdAt' | 'updatedAt'>>): Promise<KnowledgeItem> => {
  const response = await apiClient.put<KnowledgeItem>(`/knowledge/${id}`, data);
  return response.data;
};

/**
 * Delete knowledge item
 */
export const deleteKnowledgeItem = async (id: number): Promise<void> => {
  await apiClient.delete(`/knowledge/${id}`);
};

/**
 * Search knowledge base
 */
export const searchKnowledge = async (query: string, limit: number = 5): Promise<SearchResult[]> => {
  const response = await apiClient.post<SearchResult[]>('/knowledge/search', { query, limit });
  return response.data;
};

/**
 * Build knowledge base from emails
 */
export const buildKnowledgeFromEmails = async (): Promise<{ message: string; count: number }> => {
  const response = await apiClient.post<{ message: string; count: number }>('/knowledge/build-from-emails');
  return response.data;
};
