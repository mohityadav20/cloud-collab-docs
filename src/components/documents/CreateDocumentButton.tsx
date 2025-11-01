import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';
import { createDocument } from '../../graphql/mutations.js';
import { Template } from '../../types';
import TemplateSelector from './TemplateSelector';

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
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  /**
   * Handle document creation with optional template
   */
  const handleCreate = async (template: Template | null = null) => {
    // Prevent multiple clicks
    if (loading) return;
    
    try {
      setLoading(true);
      setShowTemplateSelector(false);
      
      // Get current user info from Cognito (in parallel for speed)
      const [user, session] = await Promise.all([
        getCurrentUser().catch(() => ({ username: '' })),
        fetchAuthSession().catch(() => ({ tokens: undefined }))
      ]);
      
      // Extract email from token - try multiple locations
      let email: string = '';
      if (session.tokens?.idToken?.payload) {
        const payload = session.tokens.idToken.payload;
        // Try different possible email fields
        email = (payload.email as string) || 
                (payload['cognito:username'] as string) || 
                (payload.sub as string) || 
                '';
      }
      
      // Fallback to username if email not found
      const username = user.username || email || '';
      const ownerEmail = email || username;
      
      // Validate that we have both username and email
      if (!username || username.trim() === '') {
        throw new Error('Unable to get user username. Please sign out and sign in again.');
      }
      if (!ownerEmail || ownerEmail.trim() === '') {
        throw new Error('Unable to get user email. Please sign out and sign in again.');
      }
      
      // Construct input object - ensure all required fields are valid
      const input = {
        title: template?.name || 'Untitled Document',
        content: template?.content || ' ', // Use template content or blank
        description: template?.description || '',
        tags: [],
        isFavorite: false,
        owner: username, // Required - Cognito username
        ownerEmail: ownerEmail.trim(), // Required - must be non-empty string
      };

      // Final validation before sending
      if (!input.title || !input.content || !input.owner || !input.ownerEmail) {
        throw new Error(`Invalid input: title="${input.title}", content="${input.content}", owner="${input.owner}", ownerEmail="${input.ownerEmail}"`);
      }

      console.log('Creating document...');

      // Use the auto-generated mutation from mutations.js
      // Note: CreateDocumentInput only accepts title, content, ownerEmail
      // The 'owner' field is auto-populated by @auth directive from Cognito user
      const response = await client.graphql({
        query: createDocument as any,
        variables: {
          input: input,
        },
      }) as any;

      if ('data' in response && response.data?.createDocument?.id) {
        const documentId = response.data.createDocument.id;
        const createdDocument = response.data.createDocument;
        console.log('Document created successfully:', documentId);
        
        // Reset loading state before navigation to prevent flickering
        setLoading(false);
        
        // Small delay to ensure state is reset before navigation
        setTimeout(() => {
          onCreate(documentId);
        }, 50);
      } else {
        console.error('Failed to create document:', response);
        if ('errors' in response && response.errors) {
          console.error('GraphQL errors:', response.errors);
          const errorMessage = response.errors[0]?.message || 'Unknown error';
          alert(`Failed to create document: ${errorMessage}`);
        } else {
          alert('Failed to create document. Please check console for details.');
        }
        setLoading(false); // Reset loading state on error
      }
    } catch (error: any) {
      console.error('Failed to create document:', error);
      const errorMessage = error?.message || 'An unexpected error occurred';
      alert(`Failed to create document: ${errorMessage}`);
      setLoading(false); // Reset loading state on error
    }
    // Note: Don't reset loading state here if successful - let navigation handle it
  };

  return (
    <>
      <button
        onClick={() => setShowTemplateSelector(true)}
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating...' : '+ New Document'}
      </button>

      {showTemplateSelector && (
        <TemplateSelector
          onSelect={(template) => handleCreate(template)}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}
    </>
  );
};

export default CreateDocumentButton;

