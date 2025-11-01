import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { listDocuments, listShares } from '../../graphql/queries';
import { updateDocument } from '../../graphql/mutations';
import { Document } from '../../types';
import DocumentCard from './DocumentCard';
import CreateDocumentButton from './CreateDocumentButton';

const client = generateClient();

interface Share {
  documentId: string;
  sharedWith: string;
  permission: string;
}

type ViewFilter = 'all' | 'favorites' | 'trash';

/**
 * Document list page
 * Shows all documents owned by user and shared with user
 */
const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
    loadUserInfo();
  }, []);

  /**
   * Filter documents based on search query and view filter
   */
  useEffect(() => {
    let filtered = documents;

    // Apply view filter first (all, favorites, trash)
    if (viewFilter === 'favorites') {
      filtered = documents.filter((doc) => doc.isFavorite && !doc._deleted);
    } else if (viewFilter === 'trash') {
      filtered = documents.filter((doc) => doc._deleted);
    } else {
      // 'all' - exclude deleted documents
      filtered = documents.filter((doc) => !doc._deleted);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((doc) => {
        const titleMatch = doc.title.toLowerCase().includes(query);
        const tagsMatch = doc.tags?.some(tag => 
          tag.toLowerCase().includes(query)
        ) || false;
        const descriptionMatch = doc.description?.toLowerCase().includes(query) || false;
        return titleMatch || tagsMatch || descriptionMatch;
      });
    }

    setFilteredDocuments(filtered);
  }, [searchQuery, documents, viewFilter]);

  /**
   * Load user information
   */
  const loadUserInfo = async () => {
    try {
      const session = await fetchAuthSession();
      const email = session.tokens?.idToken?.payload?.email as string;
      setUserEmail(email || '');
      
      // Get current user's username (Cognito sub/username)
      const user = await getCurrentUser();
      console.log('Current user:', user.username);
    } catch (error) {
      console.error('Failed to load user info:', error);
    }
  };

  /**
   * Load documents from GraphQL API
   * Filters to show only documents owned by user or shared with user
   */
  const loadDocuments = async () => {
    try {
      setLoading(true);
      
      // Get current user info first
      const user = await getCurrentUser();
      const username = user.username;
      const session = await fetchAuthSession();
      const email = session.tokens?.idToken?.payload?.email as string;
      
      console.log('Current user - username:', username, 'email:', email);
      
      // Load all documents (allowed by { allow: private, operations: [read] })
      const docsResponse = await client.graphql({
        query: listDocuments as any,
        variables: {},
      }) as any;
      
      // Load shares where current user is the recipient (by email OR username)
      const sharesResponse = await client.graphql({
        query: listShares as any,
        variables: {
          filter: {
            or: [
              { sharedWith: { eq: email } },
              { sharedWith: { eq: username } },
              { sharedWithEmail: { eq: email } }
            ]
          }
        },
      }) as any;

      if ('data' in docsResponse && docsResponse.data?.listDocuments?.items) {
        const allDocuments = docsResponse.data.listDocuments.items;
        
        // Get list of document IDs that are shared with the current user
        const sharedDocumentIds = new Set<string>();
        if ('data' in sharesResponse && sharesResponse.data?.listShares?.items) {
          sharesResponse.data.listShares.items.forEach((share: Share) => {
            sharedDocumentIds.add(share.documentId);
          });
          console.log('Found shares for current user:', sharesResponse.data.listShares.items);
        }
        
        console.log('Shared document IDs:', Array.from(sharedDocumentIds));
        
        // Filter documents: show only those owned by user OR shared with user
        // NOTE: We're now including deleted documents so they can be shown in trash view
        const userDocuments = allDocuments.filter((doc: Document) => {
          // Show if owned by current user
          if (doc.owner === username) return true;
          
          // Show if shared with current user (but not deleted shared docs)
          if (sharedDocumentIds.has(doc.id) && !doc._deleted) return true;
          
          // Otherwise, don't show
          return false;
        });
        
        console.log(`Filtered ${userDocuments.length} documents from ${allDocuments.length} total`);
        setDocuments(userDocuments);
        setFilteredDocuments(userDocuments);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle favorite status of a document
   */
  const handleToggleFavorite = async (documentId: string, currentValue: boolean) => {
    try {
      const doc = documents.find(d => d.id === documentId);
      if (!doc) return;

      const response = await client.graphql({
        query: updateDocument as any,
        variables: {
          input: {
            id: documentId,
            isFavorite: !currentValue,
            _version: doc._version || 1,
          },
        },
        authMode: 'userPool',
      }) as any;

      if ('data' in response && response.data?.updateDocument) {
        // Update local state
        setDocuments(docs =>
          docs.map(d =>
            d.id === documentId
              ? { ...d, isFavorite: !currentValue, _version: response.data.updateDocument._version }
              : d
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  /**
   * Restore a document from trash
   */
  const handleRestore = async (documentId: string) => {
    try {
      const doc = documents.find(d => d.id === documentId);
      if (!doc) return;

      const response = await client.graphql({
        query: updateDocument as any,
        variables: {
          input: {
            id: documentId,
            _deleted: null, // Undelete the document
            _version: doc._version || 1,
          },
        },
        authMode: 'userPool',
      }) as any;

      if ('data' in response && response.data?.updateDocument) {
        // Update local state - mark as not deleted
        setDocuments(docs =>
          docs.map(d =>
            d.id === documentId
              ? { ...d, _deleted: false, _version: response.data.updateDocument._version }
              : d
          )
        );
        alert('Document restored successfully!');
      }
    } catch (error) {
      console.error('Failed to restore document:', error);
      alert('Failed to restore document. Please try again.');
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
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setViewFilter('all')}
            className={`px-4 py-2 font-medium transition-colors ${
              viewFilter === 'all'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setViewFilter('favorites')}
            className={`px-4 py-2 font-medium transition-colors ${
              viewFilter === 'favorites'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ⭐ Favorites
          </button>
          <button
            onClick={() => setViewFilter('trash')}
            className={`px-4 py-2 font-medium transition-colors ${
              viewFilter === 'trash'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🗑️ Trash
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <CreateDocumentButton onCreate={handleCreateDocument} />
          
          {/* Search bar */}
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tags, or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Found {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
          </div>
        )}
        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onClick={() => navigate(`/documents/${doc.id}`)}
              onToggleFavorite={viewFilter !== 'trash' ? handleToggleFavorite : undefined}
              onRestore={viewFilter === 'trash' ? handleRestore : undefined}
              showRestoreButton={viewFilter === 'trash'}
            />
          ))}
        </div>

        {filteredDocuments.length === 0 && documents.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No documents match your search.</p>
          </div>
        )}

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

