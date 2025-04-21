'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { knowledgeApi } from '@/lib/api';
import type { KnowledgeItem } from '@/lib/api/knowledge';

export default function KnowledgeItemDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [knowledgeItem, setKnowledgeItem] = useState<KnowledgeItem | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<KnowledgeItem>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchKnowledgeItem = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await knowledgeApi.getKnowledgeItemById(parseInt(params.id));
        setKnowledgeItem(data);
        setEditedItem(data);
      } catch (err) {
        setError('Failed to load knowledge item. Please try again.');
        console.error('Knowledge item fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKnowledgeItem();
  }, [params.id]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);
      
      const updatedItem = await knowledgeApi.updateKnowledgeItem(parseInt(params.id), editedItem);
      setKnowledgeItem(updatedItem);
      setIsEditing(false);
      
      setSuccessMessage('Knowledge item saved successfully');
    } catch (err) {
      setError('Failed to save knowledge item. Please try again.');
      console.error('Knowledge item save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this knowledge item? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setError(null);
      
      await knowledgeApi.deleteKnowledgeItem(parseInt(params.id));
      
      // Redirect back to knowledge list
      router.push('/dashboard/knowledge');
    } catch (err) {
      setError('Failed to delete knowledge item. Please try again.');
      console.error('Knowledge item delete error:', err);
      setIsDeleting(false);
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
        <p className="mt-4 text-gray-500">Loading knowledge item...</p>
      </div>
    );
  }

  if (!knowledgeItem) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Knowledge item not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Item #{knowledgeItem.id}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Created: {formatDate(knowledgeItem.createdAt)} • 
            Updated: {formatDate(knowledgeItem.updatedAt)}
          </p>
        </div>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => {
                  setEditedItem(knowledgeItem);
                  setIsEditing(false);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
          <button
            onClick={() => router.push('/dashboard/knowledge')}
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

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Knowledge Item Details</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Source</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedItem.source || ''}
                    onChange={(e) => setEditedItem({...editedItem, source: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  knowledgeItem.source
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedItem.category || ''}
                    onChange={(e) => setEditedItem({...editedItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  knowledgeItem.category
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Language</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedItem.language || ''}
                    onChange={(e) => setEditedItem({...editedItem, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  knowledgeItem.language
                )}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Content</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {isEditing ? (
                  <textarea
                    value={editedItem.content || ''}
                    onChange={(e) => setEditedItem({...editedItem, content: e.target.value})}
                    className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="whitespace-pre-wrap">
                    {knowledgeItem.content}
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
