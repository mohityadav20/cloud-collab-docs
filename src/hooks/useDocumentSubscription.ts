import { useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onUpdateDocument } from '../graphql/subscriptions';
import { Document } from '../types';

const client = generateClient();

/**
 * Hook for subscribing to document updates
 * Provides real-time synchronization
 * Based on reference implementation pattern
 */
export const useDocumentSubscription = (documentId: string) => {
  const subscriptionRef = useRef<any>(null);

  /**
   * Subscribe to document updates
   * Matches reference implementation pattern
   */
  const subscribeToUpdates = (callback: (document: Document) => void) => {
    if (!documentId) {
      return () => {};
    }

    // Cleanup existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // Create new subscription (matching reference pattern)
    subscriptionRef.current = client
      .graphql({
        query: onUpdateDocument as any,
        variables: { id: documentId },
        authMode: 'userPool', // Explicitly set auth mode like reference
      })
      .subscribe({
        next: ({ value }: any) => {
          const updated = value?.data?.onUpdateDocument;
          if (updated) {
            callback(updated);
          }
        },
        error: (err: Error) => {
          console.warn('Subscription error:', err);
        },
      });

    // Return unsubscribe function
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return { subscribeToUpdates };
};

