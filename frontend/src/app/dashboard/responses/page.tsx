'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { responsesApi } from '@/lib/api';
import type { Response } from '@/lib/api/responses';

export default function ResponsesPage() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await responsesApi.getResponses();
        setResponses(data);
      } catch (err) {
        setError('Failed to load responses. Please try again.');
        console.error('Response fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Email Responses</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your email responses</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading responses...</p>
          </div>
        ) : responses.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No responses found. Generate responses from the emails page.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {responses.map((response) => (
              <li key={response.id}>
                <Link href={`/dashboard/responses/${response.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">
                            Response #{response.id} - Email #{response.emailId}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {truncateText(response.content)}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          response.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {response.status}
                        </span>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>
                            {response.status === 'sent' 
                              ? `Sent: ${formatDate(response.sentAt)}` 
                              : `Created: ${formatDate(response.createdAt)}`}
                          </span>
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
  );
}
