import { gql } from 'graphql-tag';

/**
 * GraphQL mutations for documents
 */

export const createDocument = gql`
  mutation CreateDocument($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
      title
      content
      createdAt
      updatedAt
      owner
      ownerEmail
    }
  }
`;

export const updateDocument = gql`
  mutation UpdateDocument($input: UpdateDocumentInput!) {
    updateDocument(input: $input) {
      id
      title
      content
      updatedAt
    }
  }
`;

export const deleteDocument = gql`
  mutation DeleteDocument($input: DeleteDocumentInput!) {
    deleteDocument(input: $input) {
      id
    }
  }
`;

export const createShare = gql`
  mutation CreateShare($input: CreateShareInput!) {
    createShare(input: $input) {
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

export const updateShare = gql`
  mutation UpdateShare($input: UpdateShareInput!) {
    updateShare(input: $input) {
      id
      permission
    }
  }
`;

export const deleteShare = gql`
  mutation DeleteShare($input: DeleteShareInput!) {
    deleteShare(input: $input) {
      id
    }
  }
`;

