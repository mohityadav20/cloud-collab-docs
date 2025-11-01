import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDocument } from '../../graphql/queries';
import { updateDocument, deleteDocument } from '../../graphql/mutations';
import { Document } from '../../types';
import DocumentToolbar from './DocumentToolbar';
import NotificationPanel from '../notifications/NotificationPanel';

const client = generateClient();

/**
 * Document editor component
 * Main editor with ReactQuill - manual save only
 */
const DocumentEditor: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState<Document | null>(null);
  const [content, setContent] = useState(' ');
  const [title, setTitle] = useState('Untitled Document');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false); // Start with false to avoid flicker
  const [isSaving, setIsSaving] = useState(false);
  const quillRef = useRef<ReactQuill>(null);


  /**
   * Manual save function
   * Saves document to GraphQL API
   */
  const handleSave = async () => {
    if (!documentId || !documentData) return;

    try {
      setIsSaving(true);
      
      // Parse tags from comma-separated string
      const tagsList = tags.split(',').map(t => t.trim()).filter(Boolean);
      
      // Include _version for conflict resolution (required by AppSync)
      const response = await client.graphql({
        query: updateDocument as any,
        variables: {
          input: {
            id: documentId,
            content: content,
            title: title,
            description: description,
            tags: tagsList.length > 0 ? tagsList : null,
            _version: documentData._version || 1, // Include version for conflict resolution
          },
        },
        authMode: 'userPool',
      }) as any;
      
      // Update document data with response from server (includes new _version)
      if ('data' in response && response.data?.updateDocument) {
        const updatedDoc = response.data.updateDocument;
        setDocumentData(updatedDoc);
        console.log('Document saved:', updatedDoc);
      }
      
      alert('Document saved successfully!');
    } catch (error: any) {
      console.error('Failed to save document:', error);
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'Failed to save document. Please try again.';
      alert(`Failed to save: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Delete document function
   * Soft deletes document using deleteDocument mutation
   */
  const handleDelete = async () => {
    if (!documentId) return;

    // Confirm deletion
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?\n\nThis can be restored from the Trash.`
    );

    if (!confirmed) return;

    try {
      setIsSaving(true); // Reuse loading state for delete operation
      
      // Fetch the latest version first to ensure we have the current _version
      const fetchResponse = await client.graphql({
        query: getDocument as any,
        variables: { id: documentId },
        authMode: 'userPool',
      }) as any;

      if (!('data' in fetchResponse) || !fetchResponse.data?.getDocument) {
        throw new Error('Document not found');
      }

      const currentDoc = fetchResponse.data.getDocument;
      
      // Check if already deleted
      if (currentDoc._deleted) {
        alert('This document has already been deleted.');
        navigate('/documents');
        return;
      }

      console.log('Deleting document with version:', currentDoc._version);
      
      // Use deleteDocument mutation (soft delete)
      const deleteResponse = await client.graphql({
        query: deleteDocument as any,
        variables: {
          input: {
            id: documentId,
            _version: currentDoc._version,
          },
        },
        authMode: 'userPool',
      }) as any;
      
      console.log('Delete response:', deleteResponse);
      
      // Navigate back to documents list after successful deletion
      alert('Document moved to trash successfully!');
      navigate('/documents');
    } catch (error: any) {
      console.error('Failed to delete document:', error);
      console.error('Full error:', JSON.stringify(error, null, 2));
      const errorMessage = error?.errors?.[0]?.message || error?.message || 'Failed to delete document. Please try again.';
      alert(`Failed to delete document: ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Handle content change
   * No auto-save - just update local state
   */
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  /**
   * Handle title change
   * No auto-save - just update local state
   */
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  /**
   * Load document once on mount
   */
  useEffect(() => {
    if (!documentId) return;

    let retryCount = 0;
    const maxRetries = 3;

    const loadWithRetry = async () => {
      try {
        setLoading(true);
        const response = await client.graphql({
          query: getDocument as any,
          variables: { id: documentId },
          authMode: 'userPool',
        }) as any;

        if ('data' in response && response.data?.getDocument) {
          const doc = response.data.getDocument;
          setDocumentData(doc);
          setTitle(doc.title);
          setContent(doc.content || ' ');
          setDescription(doc.description || '');
          setTags(doc.tags?.join(', ') || '');
          setLoading(false);
          // Store version for conflict resolution (needed for delete)
        } else if (retryCount < maxRetries) {
          // Document might not be immediately available (eventual consistency)
          retryCount++;
          setTimeout(() => {
            loadWithRetry();
          }, 300 * retryCount); // Exponential backoff
        } else {
          // After max retries, show error
          setLoading(false);
          alert('Document not found. Redirecting...');
          navigate('/documents');
        }
      } catch (error) {
        console.error('Failed to load document:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(() => {
            loadWithRetry();
          }, 300 * retryCount);
        } else {
          setLoading(false);
          alert('Failed to load document. Redirecting...');
          navigate('/documents');
        }
      }
    };

    loadWithRetry();
    
    // No subscription - only load once on mount
    // User will save manually when ready
  }, [documentId, navigate]);

  // Show loading spinner only if we're actively loading and have no data
  if (loading && !documentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentToolbar
        title={title}
        onTitleChange={handleTitleChange}
        onBack={() => navigate('/documents')}
        onSave={handleSave}
        onDelete={handleDelete}
        isSaving={isSaving}
        documentId={documentId || ''}
      />


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description and Tags */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a brief description..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. work, personal, important"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {tags && (
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.split(',').map((tag, idx) => {
                  const trimmedTag = tag.trim();
                  return trimmedTag ? (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full tracking-tight"
                    >
                      {trimmedTag}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                [{ color: [] }, { background: [] }],
                ['clean'],
              ],
            }}
          />
        </div>
      </div>

      <NotificationPanel />
    </div>
  );
};

export default DocumentEditor;

