/**
 * Type definitions for the application
 */

export interface Document {
  id: string;
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  isFavorite?: boolean;
  createdAt: string;
  updatedAt: string;
  owner: string;
  ownerEmail: string;
  _version?: number; // Version for conflict resolution
  _deleted?: boolean; // Soft delete flag
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

export interface Template {
  id: string;
  name: string;
  description?: string;
  content: string;
  category?: string;
  isPublic?: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

