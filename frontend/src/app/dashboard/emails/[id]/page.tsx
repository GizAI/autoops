'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { emailsApi, responsesApi } from '@/lib/api';
import type { Email } from '@/lib/api/emails';
import type { Response } from '@/lib/api/responses';

export default function EmailDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [email, setEmail] = useState<Email | null>(null);
  const [thread, setThread] = useState<any | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch email details
        const emailData = await emailsApi.getEmailById(parseInt(params.id));
        setEmail(emailData);
        
        // Fetch thread messages
        if (emailData.threadId) {
          const threadData = await emailsApi.getEmailThread(emailData.threadId);
          setThread(threadData);
        }
        
        // Fetch responses for this email
        const allResponses = await responsesApi.getResponses();
        const emailResponses = allResponses.filter(response => response.emailId === parseInt(params.id));
        setResponses(emailResponses);
      } catch (err) {
        setError('Failed to load email details. Please try again.');
        console.error('Email details fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmailDetails();
  }, [params.id]);

  const handleGenerateResponse = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Generate response
      const response = await responsesApi.generateResponse(parseInt(params.id));
      
      // Update responses list
      setResponses(prev => [...prev, response]);
      
      // Navigate to response edit page
      router.push(`/dashboard/responses/${response.id}`);
    } catch (err) {
      setError('Failed to generate response. Please try again.');
      console.error('Response generation error:', err);
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading email details...</p>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Email not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 truncate">{email.subject}</h1>
          <p className="mt-1 text-sm text-gray-500">From: {email.fromEmail} • {formatDate(email.receivedAt)}</p>
        </div>
        <div>
          <button
            onClick={handleGenerateResponse}
            disabled={isGenerating}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Response'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Email Thread */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Email Thread</h3>
        </div>
        <div className="border-t border-gray-200">
          {thread ? (
            <div className="divide-y divide-gray-200">
              {thread.messages.map((message: any) => (
                <div key={message.id} className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-medium">{message.from}</span>
                      <span className="text-gray-500 ml-2">to {message.to}</span>
                    </div>
                    <div className="text-sm text-gray-500">{message.date}</div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{message.body}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 sm:px-6 text-gray-500">
              No thread messages available.
            </div>
          )}
        </div>
      </div>

      {/* Responses */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Responses</h3>
        </div>
        <div className="border-t border-gray-200">
          {responses.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {responses.map((response) => (
                <div key={response.id} className="px-4 py-5 sm:px-6">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        response.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {response.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {response.status === 'sent' 
                        ? `Sent: ${formatDate(response.sentAt || '')}` 
                        : `Created: ${formatDate(response.createdAt)}`}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{response.content}</div>
                  {response.status === 'draft' && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => router.push(`/dashboard/responses/${response.id}`)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit Response
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 sm:px-6 text-gray-500">
              No responses yet. Click "Generate Response" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
