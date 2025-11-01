import React, { useState } from 'react';
import ShareButton from './ShareButton';
import ExportButton from './ExportButton';

interface DocumentToolbarProps {
  title: string;
  onTitleChange: (title: string) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete: () => void;
  isSaving: boolean;
  documentId: string;
}

/**
 * Document toolbar component
 * Handles title editing, sharing, and export
 */
const DocumentToolbar: React.FC<DocumentToolbarProps> = ({
  title,
  onTitleChange,
  isSaving,
  onBack,
  onSave,
  onDelete,
  documentId,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  /**
   * Handle title edit
   */
  const handleTitleEdit = () => {
    setIsEditingTitle(true);
    setTempTitle(title);
  };

  /**
   * Handle title save
   */
  const handleTitleSave = () => {
    setIsEditingTitle(false);
    onTitleChange(tempTitle);
  };

  /**
   * Handle title cancel
   */
  const handleTitleCancel = () => {
    setIsEditingTitle(false);
    setTempTitle(title);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>

            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTitleSave();
                  } else if (e.key === 'Escape') {
                    handleTitleCancel();
                  }
                }}
                className="text-xl font-semibold text-gray-900 border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                autoFocus
              />
            ) : (
              <h1
                onClick={handleTitleEdit}
                className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
              >
                {title}
              </h1>
            )}

            {isSaving && (
              <span className="text-sm text-gray-500 tracking-tight">Saving...</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={onDelete}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed tracking-tight"
            >
              Delete
            </button>
            <ExportButton documentId={documentId} />
            <ShareButton documentId={documentId} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DocumentToolbar;

