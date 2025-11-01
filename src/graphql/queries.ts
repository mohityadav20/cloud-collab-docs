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
      description
      tags
      isFavorite
      createdAt
      updatedAt
      owner
      ownerEmail
      _version
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
        description
        tags
        isFavorite
        createdAt
        updatedAt
        owner
        ownerEmail
        _version
        _deleted
      }
      nextToken
    }
  }
`;

export const listShares = gql`
  query ListShares($filter: ModelShareFilterInput) {
    listShares(filter: $filter) {
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

export const listTemplates = gql`
  query ListTemplates($filter: ModelTemplateFilterInput) {
    listTemplates(filter: $filter) {
      items {
        id
        name
        description
        content
        category
        isPublic
        owner
        createdAt
        updatedAt
      }
    }
  }
`;

