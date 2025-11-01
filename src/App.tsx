import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { configure } from './amplify/configure';
import AuthPage from './components/auth/AuthPage';
import DocumentList from './components/documents/DocumentList';
import DocumentEditor from './components/documents/DocumentEditor';
import LoadingSpinner from './components/common/LoadingSpinner';
import './amplify/configure';

/**
 * Main App component
 * Configures Amplify and handles routing
 */
function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Configure Amplify
    configure();
    setIsConfigured(true);
    
    // Check authentication status on mount
    checkAuth();

    // Listen for auth state changes (login, logout, etc.)
    const unsubscribe = Hub.listen('auth', (data) => {
      const { payload } = data;
      
      switch (payload.event) {
        case 'signedIn':
        case 'tokenRefresh':
          console.log('User signed in or token refreshed');
          checkAuth();
          break;
        case 'signedOut':
          console.log('User signed out');
          setIsAuthenticated(false);
          break;
        default:
          break;
      }
    });

    // Also check auth periodically (as a fallback)
    const authCheckInterval = setInterval(() => {
      checkAuth();
    }, 2000); // Check every 2 seconds

    // Cleanup
    return () => {
      unsubscribe();
      clearInterval(authCheckInterval);
    };
  }, []);

  /**
   * Check if user is authenticated
   */
  const checkAuth = async () => {
    try {
      const session = await fetchAuthSession();
      const authenticated = session.tokens !== undefined;
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (!isConfigured || isChecking) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            isAuthenticated ? <Navigate to="/documents" replace /> : <AuthPage />
          }
        />
        <Route
          path="/documents"
          element={
            isAuthenticated ? (
              <DocumentList />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/documents/:documentId"
          element={
            isAuthenticated ? (
              <DocumentEditor />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/documents" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

