import { Document } from '../types';

/**
 * Hook for subscribing to document updates
 * DEPRECATED: No longer using real-time subscriptions (removed for manual save)
 * Kept for backwards compatibility
 */
export const useDocumentSubscription = (_documentId: string) => {
  /**
   * Subscribe to document updates - No-op version
   */
  const subscribeToUpdates = (_callback: (document: Document) => void) => {
    // No-op: subscriptions disabled
    return () => {};
  };

  return { subscribeToUpdates };
};
