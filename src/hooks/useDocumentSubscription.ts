import { useEffect, useRef } from 'react';
import { generateClient } from 'aws-amplify/api';
import { onUpdateDocument } from '../graphql/subscriptions';
import { Document } from '../types';

const client = generateClient();

/**
 * Hook for subscribing to document updates
 * Provides real-time synchronization
 */
export const useDocumentSubscription = (documentId: string) => {
  const subscriptionRef = useRef<any>(null);

  /**
   * Subscribe to document updates
   */
  const subscribeToUpdates = (callback: (document: Document) => void) => {
    if (!documentId) {
      return () => {};
    }

    // Cleanup existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // Create new subscription
    const subscription = client.graphql({
      query: onUpdateDocument as any,
      variables: { documentId },
    }) as any;
    
    subscriptionRef.current = subscription.subscribe({
      next: ({ data }: any) => {
        if (data?.onUpdateDocument) {
          callback(data.onUpdateDocument);
        }
      },
      error: (error: Error) => {
        console.error('Subscription error:', error);
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

