import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listShares } from '../../graphql/queries';
import { createShare, updateShare, deleteShare } from '../../graphql/mutations';
import { Share as ShareType } from '../../types';

const client = generateClient();

interface ShareDialogProps {
  documentId: string;
  onClose?: () => void;
}

/**
 * Share dialog component
 * Allows inviting users with READ or WRITE permissions
 */
const ShareDialog: React.FC<ShareDialogProps> = ({ documentId, onClose }) => {
  const [shares, setShares] = useState<ShareType[]>([]);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'READ' | 'WRITE'>('READ');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadShares();
  }, [documentId]);

  /**
   * Load existing shares
   */
  const loadShares = async () => {
    try {
      const response = await client.graphql({
        query: listShares,
        variables: { documentId },
      });

      if (response.data?.listShares?.items) {
        setShares(response.data.listShares.items);
      }
    } catch (error) {
      console.error('Failed to load shares:', error);
    }
  };

  /**
   * Handle share creation
   */
  const handleShare = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      await client.graphql({
        query: createShare,
        variables: {
          input: {
            documentId,
            sharedWith: email,
            sharedWithEmail: email,
            permission,
          },
        },
      });

      setEmail('');
      loadShares();
    } catch (error) {
      console.error('Failed to share document:', error);
      alert('Failed to share document. Please check the email and try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle permission update
   */
  const handleUpdatePermission = async (shareId: string, newPermission: 'READ' | 'WRITE') => {
    try {
      await client.graphql({
        query: updateShare,
        variables: {
          input: {
            id: shareId,
            permission: newPermission,
          },
        },
      });

      loadShares();
    } catch (error) {
      console.error('Failed to update permission:', error);
    }
  };

  /**
   * Handle share removal
   */
  const handleRemoveShare = async (shareId: string) => {
    try {
      await client.graphql({
        query: deleteShare,
        variables: { input: { id: shareId } },
      });

      loadShares();
    } catch (error) {
      console.error('Failed to remove share:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Share Document</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={permission}
                onChange={(e) => setPermission(e.target.value as 'READ' | 'WRITE')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="READ">Read</option>
                <option value="WRITE">Write</option>
              </select>
              <button
                onClick={handleShare}
                disabled={loading || !email.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
              >
                {loading ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Shared with:</h3>
            <div className="space-y-2">
              {shares.map((share) => (
                <div
                  key={share.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-700">{share.sharedWithEmail}</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={share.permission}
                      onChange={(e) =>
                        handleUpdatePermission(share.id, e.target.value as 'READ' | 'WRITE')
                      }
                      className="text-xs px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="READ">Read</option>
                      <option value="WRITE">Write</option>
                    </select>
                    <button
                      onClick={() => handleRemoveShare(share.id)}
                      className="text-red-600 hover:text-red-800 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;

