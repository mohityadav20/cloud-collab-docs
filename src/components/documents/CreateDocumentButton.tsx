import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createDocument } from '../../graphql/mutations';

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
      const response = await client.graphql({
        query: createDocument as any,
        variables: {
          input: {
            title: 'Untitled Document',
            content: '',
            ownerEmail: '', // Will be set by resolver from Cognito
          },
        },
      }) as any;

      if ('data' in response && response.data?.createDocument?.id) {
        onCreate(response.data.createDocument.id);
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

