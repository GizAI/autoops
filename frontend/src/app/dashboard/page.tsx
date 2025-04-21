'use client';

import { useState, useEffect } from 'react';
import { emailsApi, responsesApi } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEmails: 0,
    pendingEmails: 0,
    processedEmails: 0,
    draftResponses: 0,
    sentResponses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch emails
        const emails = await emailsApi.getEmails();
        
        // Fetch responses
        const allResponses = await responsesApi.getResponses();
        const draftResponses = await responsesApi.getDraftResponses();
        
        // Calculate stats
        setStats({
          totalEmails: emails.length,
          pendingEmails: emails.filter(email => email.status === 'pending').length,
          processedEmails: emails.filter(email => email.status === 'processed' || email.status === 'responded').length,
          draftResponses: draftResponses.length,
          sentResponses: allResponses.filter(response => response.status === 'sent').length,
        });
      } catch (err: any) {
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleSyncEmails = async () => {
    try {
      setIsLoading(true);
      await emailsApi.syncEmails();
      // Refresh stats after sync
      const emails = await emailsApi.getEmails();
      setStats(prev => ({
        ...prev,
        totalEmails: emails.length,
        pendingEmails: emails.filter(email => email.status === 'pending').length,
        processedEmails: emails.filter(email => email.status === 'processed' || email.status === 'responded').length,
      }));
    } catch (err) {
      setError('Failed to sync emails. Please try again.');
      console.error('Email sync error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your email automation system</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button
          onClick={handleSyncEmails}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Syncing...' : 'Sync Emails'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Email Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Emails</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{isLoading ? '...' : stats.totalEmails}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Emails */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Emails</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{isLoading ? '...' : stats.pendingEmails}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Processed Emails */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Processed Emails</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{isLoading ? '...' : stats.processedEmails}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Draft Responses */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Draft Responses</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{isLoading ? '...' : stats.draftResponses}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Sent Responses */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Sent Responses</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{isLoading ? '...' : stats.sentResponses}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
