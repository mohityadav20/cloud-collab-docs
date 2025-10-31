import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocumentCard from '../components/documents/DocumentCard';
import { Document } from '../types';

/**
 * Document component tests
 */
describe('DocumentCard', () => {
  const mockDocument: Document = {
    id: '1',
    title: 'Test Document',
    content: '<p>Test content</p>',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: 'testuser',
    ownerEmail: 'test@example.com',
  };

  it('renders document title', () => {
    render(<DocumentCard document={mockDocument} onClick={() => {}} />);
    expect(screen.getByText('Test Document')).toBeInTheDocument();
  });

  it('renders document owner email', () => {
    render(<DocumentCard document={mockDocument} onClick={() => {}} />);
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<DocumentCard document={mockDocument} onClick={onClick} />);
    
    const card = screen.getByText('Test Document').closest('div');
    if (card) {
      card.click();
      expect(onClick).toHaveBeenCalledTimes(1);
    }
  });
});

