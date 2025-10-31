import React, { useState } from 'react';
import ShareDialog from './ShareDialog';

interface ShareButtonProps {
  documentId: string;
}

/**
 * Share button component
 * Opens share dialog
 */
const ShareButton: React.FC<ShareButtonProps> = ({ documentId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 tracking-tight"
      >
        Share
      </button>
      {isOpen && <ShareDialog documentId={documentId} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ShareButton;

