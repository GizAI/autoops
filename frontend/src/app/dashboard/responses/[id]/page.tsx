'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { responsesApi, emailsApi } from '@/lib/api';
import type { Response } from '@/lib/api/responses';
import type { Email } from '@/lib/api/emails';

export default function ResponseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [response, setResponse] = useState<Response | null>(null);
  const [email, setEmail] = useState<Email | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchResponseDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch response details
        const responseData = await responsesApi.getResponseById(parseInt(params.id));
        setResponse(responseData);
        setEditedContent(responseData.content);
        
        // Fetch related email
        if (responseData.emailId) {
          const emailData = await emailsApi.getEmailById(responseData.emailId);
          setEmail(emailData);
        }
      } catch (err) {
        setError('Failed to load response details. Please try again.');
        console.error('Response details fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponseDetails();
  }, [params.id]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);
      
      // Update response
      const updatedResponse = await responsesApi.updateResponse(parseInt(params.id), editedContent);
      setResponse(updatedResponse);
      
      setSuccessMessage('Response saved successfully');
    } catch (err) {
      setError('Failed to save response. Please try again.');
      console.error('Response save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSend = async () => {
    try {
      setIsSending(true);
      setError(null);
      setSuccessMessage(null);
      
      // Save first if content has changed
      if (response && editedContent !== response.content) {
        await responsesApi.updateResponse(parseInt(params.id), editedContent);
      }
      
      // Send response
      const sentResponse = await responsesApi.sendResponse(parseInt(params.id));
      setResponse(sentResponse);
      
      setSuccessMessage('Response sent successfully');
    } catch (err) {
      setError('Failed to send response. Please try again.');
      console.error('Response send error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">Loading response details...</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Response not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Response #{response.id}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Status: <span className={`px-2 py-0.5 rounded-full ${
              response.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>{response.status}</span>
            {response.status === 'sent' && response.sentAt && ` • Sent: ${formatDate(response.sentAt)}`}
          </p>
        </div>
        <div className="flex space-x-4">
          {response.status === 'draft' && (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving || isSending}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleSend}
                disabled={isSaving || isSending}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </>
          )}
          <button
            onClick={() => router.push('/dashboard/responses')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to List
          </button>
        </div>
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

      {/* Original Email */}
      {email && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Original Email</h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-500">From</div>
              <div className="mt-1 text-sm text-gray-900">{email.fromEmail}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-500">Subject</div>
              <div className="mt-1 text-sm text-gray-900">{email.subject}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-500">Received</div>
              <div className="mt-1 text-sm text-gray-900">{formatDate(email.receivedAt)}</div>
            </div>
            <div>
              <button
                onClick={() => router.push(`/dashboard/emails/${email.id}`)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Full Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Response Content</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {response.status === 'draft' ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSaving || isSending}
            />
          ) : (
            <div className="whitespace-pre-wrap text-sm text-gray-700">
              {response.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
