/**
 * Type definitions for the application
 */

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  ownerEmail: string;
}

export interface Share {
  id: string;
  documentId: string;
  sharedWith: string;
  sharedWithEmail: string;
  permission: 'READ' | 'WRITE';
  sharedBy: string;
  sharedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface DocumentPresence {
  id: string;
  documentId: string;
  userId: string;
  username?: string;
  lastSeen: string;
}

