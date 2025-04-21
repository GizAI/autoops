'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { knowledgeApi } from '@/lib/api';
import type { KnowledgeItem } from '@/lib/api/knowledge';

export default function KnowledgeBasePage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuildingKnowledge, setIsBuildingKnowledge] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  const fetchKnowledgeItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await knowledgeApi.getKnowledgeItems();
      setKnowledgeItems(data);
    } catch (err) {
      setError('Failed to load knowledge items. Please try again.');
      console.error('Knowledge fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildKnowledge = async () => {
    try {
      setIsBuildingKnowledge(true);
      setError(null);
      setSuccessMessage(null);
      
      const result = await knowledgeApi.buildKnowledgeFromEmails();
      setSuccessMessage(`Successfully built knowledge base with ${result.count} items.`);
      
      // Refresh knowledge items
      await fetchKnowledgeItems();
    } catch (err) {
      setError('Failed to build knowledge base. Please try again.');
      console.error('Knowledge build error:', err);
    } finally {
      setIsBuildingKnowledge(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      setError(null);
      
      const results = await knowledgeApi.searchKnowledge(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search knowledge base. Please try again.');
      console.error('Knowledge search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your knowledge base for email responses</p>
        </div>
        <button
          onClick={handleBuildKnowledge}
          disabled={isBuildingKnowledge}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBuildingKnowledge ? 'Building...' : 'Build from Emails'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Search */}
      <div className="mb-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Search Knowledge Base</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search query..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700 mb-2">Search Results</h4>
              <ul className="divide-y divide-gray-200">
                {searchResults.map((result, index) => (
                  <li key={index} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{truncateText(result.content, 150)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Source: {result.source} • Category: {result.category} • 
                          Similarity: {(result.similarity * 100).toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Knowledge Items */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Knowledge Items</h3>
          <Link
            href="/dashboard/knowledge/new"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Item
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading knowledge items...</p>
            </div>
          ) : knowledgeItems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No knowledge items found. Click "Build from Emails" to generate knowledge items.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {knowledgeItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/dashboard/knowledge/${item.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="truncate max-w-2xl">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {truncateText(item.content, 150)}
                          </p>
                          <div className="mt-2 flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="mr-2">Source: {item.source}</span>
                              <span className="mr-2">Category: {item.category}</span>
                              <span>Language: {item.language}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                          <div className="text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
