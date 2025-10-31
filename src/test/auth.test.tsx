import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from '../components/auth/AuthPage';

/**
 * Auth component tests
 */
describe('AuthPage', () => {
  it('renders authentication form', async () => {
    render(
      <BrowserRouter>
        <AuthPage />
      </BrowserRouter>
    );

    // Check if Authenticator component is rendered
    await waitFor(() => {
      expect(screen.getByText(/Cloud Collaborative Docs/i)).toBeInTheDocument();
    });
  });
});

