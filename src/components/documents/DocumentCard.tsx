import React from 'react';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
}

/**
 * Document card component
 * Displays document preview in list view
 */
const DocumentCard: React.FC<DocumentCardProps> = ({ document, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {document.title || 'Untitled Document'}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {document.content?.replace(/<[^>]*>/g, '').substring(0, 100)}...
      </p>
      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Updated {new Date(document.updatedAt).toLocaleDateString()}</span>
        <span className="tracking-tight">By {document.ownerEmail}</span>
      </div>
    </div>
  );
};

export default DocumentCard;

