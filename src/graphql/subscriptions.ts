import { gql } from 'graphql-tag';

/**
 * GraphQL subscriptions for real-time updates
 */

export const onUpdateDocument = gql`
  subscription OnUpdateDocument($documentId: ID!) {
    onUpdateDocument(documentId: $documentId) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const onCreateShare = gql`
  subscription OnCreateShare($documentId: ID!) {
    onCreateShare(documentId: $documentId) {
      id
      documentId
      sharedWith
      sharedWithEmail
      permission
      sharedBy
      sharedAt
    }
  }
`;

export const onUpdateShare = gql`
  subscription OnUpdateShare($documentId: ID!) {
    onUpdateShare(documentId: $documentId) {
      id
      permission
    }
  }
`;

export const onDeleteShare = gql`
  subscription OnDeleteShare($documentId: ID!) {
    onDeleteShare(documentId: $documentId) {
      id
    }
  }
`;

export const onDocumentPresenceChanged = gql`
  subscription OnDocumentPresenceChanged($documentId: ID!) {
    onDocumentPresenceChanged(documentId: $documentId) {
      id
      userId
      username
      lastSeen
    }
  }
`;

