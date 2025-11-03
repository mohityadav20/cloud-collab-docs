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
      className="document-card bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer relative overflow-hidden group animate-fadeIn border border-gray-100"
    >
      {/* Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Favorite star button */}
      {onToggleFavorite && (
        <button
          onClick={handleStarClick}
          className="absolute top-4 right-4 text-2xl hover:scale-125 transform transition-all duration-300 z-10"
          title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {document.isFavorite ? (
            <span className="animate-scalePop">⭐</span>
          ) : (
            <span className="opacity-60 hover:opacity-100">☆</span>
          )}
        </button>
      )}

      {/* Restore button for trash */}
      {showRestoreButton && onRestore && (
        <button
          onClick={handleRestoreClick}
          className="absolute top-4 right-4 px-4 py-2 text-sm font-medium gradient-primary text-white rounded-lg hover:shadow-glow transform hover:scale-105 transition-all duration-300 tracking-tight"
        >
          ↻ Restore
        </button>
      )}
      
      {/* Document Icon with Gradient */}
      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <span className="text-2xl">📄</span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 pr-8 group-hover:text-gradient transition-all duration-300">
        {document.title || 'Untitled Document'}
      </h3>
      
      {document.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {document.description}
        </p>
      )}
      
      {document.tags && document.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {document.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-50 rounded-full tracking-tight border border-purple-200 hover:bg-purple-100 transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
        {document.content?.replace(/<[^>]*>/g, '').substring(0, 100)}...
      </p>
      
      {/* Bottom Info with Icons */}
      <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span>🕒</span>
          <span>{new Date(document.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1 tracking-tight">
          <span>👤</span>
          <span className="truncate max-w-[120px]">{document.ownerEmail}</span>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
           style={{ boxShadow: '0 0 40px rgba(102, 126, 234, 0.1) inset' }}></div>
    </div>
  );
};

export default DocumentCard;

