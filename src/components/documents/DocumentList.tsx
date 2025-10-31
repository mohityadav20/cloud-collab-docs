import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listDocuments } from '../../graphql/queries';
import { Document } from '../../types';
import DocumentCard from './DocumentCard';
import CreateDocumentButton from './CreateDocumentButton';

const client = generateClient();

/**
 * Document list page
 * Shows all documents owned by user and shared with user
 */
const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
    loadUserInfo();
  }, []);

  /**
   * Load user information
   */
  const loadUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const email = session.tokens?.idToken?.payload?.email as string;
      setUserEmail(email || '');
    } catch (error) {
      console.error('Failed to load user info:', error);
    }
  };

  /**
   * Load documents from GraphQL API
   */
  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: listDocuments as any,
        variables: {},
      }) as any;

      if ('data' in response && response.data?.listDocuments?.items) {
        setDocuments(response.data.listDocuments.items);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle document creation
   */
  const handleCreateDocument = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  /**
   * Handle sign out
   */
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              My Documents
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateDocumentButton onCreate={handleCreateDocument} />
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={() => navigate(`/documents/${doc.id}`)}
            />
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No documents yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentList;

