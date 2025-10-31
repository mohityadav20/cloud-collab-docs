import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
// Use auto-generated mutation from Amplify
import { createDocument } from '../../graphql/mutations.js';

const client = generateClient();

interface CreateDocumentButtonProps {
  onCreate: (documentId: string) => void;
}

/**
 * Create document button component
 * Creates a new document and navigates to editor
 */
const CreateDocumentButton: React.FC<CreateDocumentButtonProps> = ({ onCreate }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Handle document creation
   */
  const handleCreate = async () => {
    try {
      setLoading(true);
      
      // Get current user info from Cognito
      const user = await getCurrentUser();
      const session = await fetchAuthSession();
      const email = session.tokens?.idToken?.payload?.email as string || '';
      const username = user.username || email;

      // Use the auto-generated mutation from mutations.js
      // Note: CreateDocumentInput only accepts title, content, ownerEmail
      // The 'owner' field is auto-populated by @auth directive from Cognito user
      const response = await client.graphql({
        query: createDocument as any,
        variables: {
          input: {
            title: 'Untitled Document',
            content: '',
            ownerEmail: email || username || 'unknown', // Required field
          },
        },
      }) as any;

      if ('data' in response && response.data?.createDocument?.id) {
        onCreate(response.data.createDocument.id);
      } else {
        console.error('Failed to create document:', response);
        if ('errors' in response) {
          console.error('GraphQL errors:', response.errors);
          alert(`Failed to create document: ${response.errors[0]?.message || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Failed to create document:', error);
      alert('Failed to create document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreate}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Creating...' : '+ New Document'}
    </button>
  );
};

export default CreateDocumentButton;

