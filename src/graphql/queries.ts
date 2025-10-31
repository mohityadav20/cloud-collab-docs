import { gql } from 'graphql-tag';

/**
 * GraphQL queries for documents
 */

export const getDocument = gql`
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
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

export const listDocuments = gql`
  query ListDocuments($filter: ModelDocumentFilterInput, $limit: Int, $nextToken: String) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
        owner
        ownerEmail
      }
      nextToken
    }
  }
`;

export const listShares = gql`
  query ListShares($documentId: ID!) {
    listShares(filter: { documentId: { eq: $documentId } }) {
      items {
        id
        documentId
        sharedWith
        sharedWithEmail
        permission
        sharedBy
        sharedAt
      }
    }
  }
`;

export const getUserProfileByEmail = gql`
  query GetUserProfileByEmail($email: String!) {
    getUserProfileByEmail(email: $email) {
      id
      email
      username
      avatarUrl
      createdAt
    }
  }
`;

