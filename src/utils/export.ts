/**
 * Export utilities for documents
 * Supports PDF, Markdown, and Word formats
 */

/**
 * Export document to PDF (client-side)
 * Uses browser's print functionality
 */
export const exportToPDF = async (title: string, content: string): Promise<void> => {
  // Create a new window with the document content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('Failed to open print window');
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #333;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div>${content}</div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};

/**
 * Export document to Markdown
 * Converts HTML to Markdown (simplified)
 */
export const exportToMarkdown = async (title: string, content: string): Promise<void> => {
  // Simple HTML to Markdown conversion
  let markdown = `# ${title}\n\n`;
  
  // Remove HTML tags (simplified - production should use a proper converter)
  const textContent = content
    .replace(/<h1>/g, '# ')
    .replace(/<h2>/g, '## ')
    .replace(/<h3>/g, '### ')
    .replace(/<\/h[1-6]>/g, '\n\n')
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<strong>/g, '**')
    .replace(/<\/strong>/g, '**')
    .replace(/<em>/g, '_')
    .replace(/<\/em>/g, '_')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  markdown += textContent;

  // Create and download file
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Export document to Word
 * Creates a .docx file using HTML
 */
export const exportToWord = async (title: string, content: string): Promise<void> => {
  // Create HTML document for Word
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <div>${content}</div>
      </body>
    </html>
  `;

  // Create and download file
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]/gi, '_')}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

