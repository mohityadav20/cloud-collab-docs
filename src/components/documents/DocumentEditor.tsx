import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDocument } from '../../graphql/queries';
import { updateDocument } from '../../graphql/mutations';
import { Document } from '../../types';
import DocumentToolbar from './DocumentToolbar';
import ShareDialog from './ShareDialog';
import NotificationPanel from '../notifications/NotificationPanel';
import { useDocumentSubscription } from '../../hooks/useDocumentSubscription';
import { debounce } from '../../utils/debounce';

const client = generateClient();

/**
 * Document editor component
 * Main editor with ReactQuill and real-time sync via GraphQL subscriptions
 */
const DocumentEditor: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState<Document | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const quillRef = useRef<ReactQuill>(null);

  // Real-time subscription hook
  const { subscribeToUpdates } = useDocumentSubscription(documentId || '');

  /**
   * Load document from GraphQL API
   */
  const loadDocument = useCallback(async () => {
    if (!documentId) return;

    try {
      setLoading(true);
      const response = await client.graphql({
        query: getDocument as any,
        variables: { id: documentId },
      }) as any;

      if ('data' in response && response.data?.getDocument) {
        const doc = response.data.getDocument;
        setDocumentData(doc);
        setTitle(doc.title);
        setContent(doc.content || '');
      }
    } catch (error) {
      console.error('Failed to load document:', error);
      alert('Failed to load document. Redirecting...');
      navigate('/documents');
    } finally {
      setLoading(false);
    }
  }, [documentId, navigate]);

  /**
   * Save document to GraphQL API
   * Uses debouncing to avoid excessive API calls
   */
  const saveDocument = useCallback(
    debounce(async (newContent: string, newTitle: string) => {
      if (!documentId) return;

      try {
        setIsSaving(true);
        await client.graphql({
          query: updateDocument as any, // This is actually a mutation, but Amplify GraphQL uses 'query' field
          variables: {
            input: {
              id: documentId,
              content: newContent,
              title: newTitle,
            },
          },
        }) as any;
      } catch (error) {
        console.error('Failed to save document:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [documentId]
  );

  /**
   * Handle content change
   */
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (title && documentId) {
      saveDocument(newContent, title);
    }
  };

  /**
   * Handle title change
   */
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (documentId) {
      saveDocument(content, newTitle);
    }
  };

  /**
   * Setup real-time subscription
   */
  useEffect(() => {
    if (!documentId) return;

    loadDocument();

    // Subscribe to document updates
    const unsubscribe = subscribeToUpdates((updatedDoc: Document) => {
      // Only update if content changed externally
      if (updatedDoc.id === documentId) {
        // Don't overwrite local changes if user is typing
        // This is a simple implementation; production should use operational transforms
        if (documentData && updatedDoc.updatedAt !== documentData.updatedAt) {
          const isLocalChange = quillRef.current?.getEditor().hasFocus();
          if (!isLocalChange) {
            setContent(updatedDoc.content || '');
            setDocumentData(updatedDoc);
          }
        } else if (!documentData) {
          // First load
          setDocumentData(updatedDoc);
          setContent(updatedDoc.content || '');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [documentId, loadDocument, subscribeToUpdates]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!documentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Document not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentToolbar
        title={title}
        onTitleChange={handleTitleChange}
        onBack={() => navigate('/documents')}
        isSaving={isSaving}
        documentId={documentId || ''}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <ShareDialog documentId={documentId || ''} />
      <NotificationPanel />
    </div>
  );
};

export default DocumentEditor;

