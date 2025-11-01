import React from 'react';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onClick: () => void;
  onToggleFavorite?: (documentId: string, currentValue: boolean) => void;
  onRestore?: (documentId: string) => void;
  showRestoreButton?: boolean;
}

/**
 * Document card component
 * Displays document preview in list view
 */
const DocumentCard: React.FC<DocumentCardProps> = ({ 
  document, 
  onClick, 
  onToggleFavorite, 
  onRestore,
  showRestoreButton 
}) => {
  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    if (onToggleFavorite) {
      onToggleFavorite(document.id, document.isFavorite || false);
    }
  };

  const handleRestoreClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick
    if (onRestore) {
      onRestore(document.id);
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow relative"
    >
      {/* Favorite star button */}
      {onToggleFavorite && (
        <button
          onClick={handleStarClick}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
          title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {document.isFavorite ? '⭐' : '☆'}
        </button>
      )}

      {/* Restore button for trash */}
      {showRestoreButton && onRestore && (
        <button
          onClick={handleRestoreClick}
          className="absolute top-4 right-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 tracking-tight"
        >
          Restore
        </button>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-8">
        {document.title || 'Untitled Document'}
      </h3>
      
      {document.description && (
        <p className="text-sm text-gray-600 mb-2">
          {document.description}
        </p>
      )}
      
      {document.tags && document.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {document.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
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

