import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { getDocument } from '../../graphql/queries';
import { exportToPDF, exportToMarkdown, exportToWord } from '../../utils/export';

const client = generateClient();

interface ExportButtonProps {
  documentId: string;
}

/**
 * Export button component
 * Handles export to PDF, Markdown, and Word
 */
const ExportButton: React.FC<ExportButtonProps> = ({ documentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  /**
   * Handle export
   */
  const handleExport = async (format: 'pdf' | 'markdown' | 'word') => {
    try {
      setExporting(true);
      
      // Load document
      const response = await client.graphql({
        query: getDocument as any,
        variables: { id: documentId },
      }) as any;

      if (!('data' in response) || !response.data?.getDocument) {
        throw new Error('Document not found');
      }

      const doc = response.data.getDocument;
      
      // Export based on format
      switch (format) {
        case 'pdf':
          await exportToPDF(doc.title, doc.content || '');
          break;
        case 'markdown':
          await exportToMarkdown(doc.title, doc.content || '');
          break;
        case 'word':
          await exportToWord(doc.title, doc.content || '');
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export document. Please try again.');
    } finally {
      setExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 tracking-tight"
        disabled={exporting}
      >
        {exporting ? 'Exporting...' : 'Export'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              onClick={() => handleExport('pdf')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as PDF
            </button>
            <button
              onClick={() => handleExport('markdown')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as Markdown
            </button>
            <button
              onClick={() => handleExport('word')}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export as Word
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;

