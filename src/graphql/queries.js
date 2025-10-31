/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserProfileByEmail = /* GraphQL */ `
  query GetUserProfileByEmail($email: String!) {
    getUserProfileByEmail(email: $email) {
      id
      email
      username
      avatarUrl
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      __typename
    }
  }
`;
export const getDocument = /* GraphQL */ `
  query GetDocument($id: ID!) {
    getDocument(id: $id) {
      id
      title
      content
      createdAt
      updatedAt
      owner
      ownerEmail
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        createdAt
        updatedAt
        owner
        ownerEmail
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDocuments = /* GraphQL */ `
  query SyncDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocuments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        createdAt
        updatedAt
        owner
        ownerEmail
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getShare = /* GraphQL */ `
  query GetShare($id: ID!) {
    getShare(id: $id) {
      id
      documentId
      sharedWith
      sharedWithEmail
      permission
      sharedBy
      sharedAt
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listShares = /* GraphQL */ `
  query ListShares(
    $filter: ModelShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        documentId
        sharedWith
        sharedWithEmail
        permission
        sharedBy
        sharedAt
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncShares = /* GraphQL */ `
  query SyncShares(
    $filter: ModelShareFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShares(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        documentId
        sharedWith
        sharedWithEmail
        permission
        sharedBy
        sharedAt
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      email
      username
      avatarUrl
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      __typename
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        username
        avatarUrl
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserProfiles = /* GraphQL */ `
  query SyncUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        email
        username
        avatarUrl
        createdAt
        _version
        _deleted
        _lastChangedAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getDocumentPresence = /* GraphQL */ `
  query GetDocumentPresence($id: ID!) {
    getDocumentPresence(id: $id) {
      id
      documentId
      userId
      username
      lastSeen
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDocumentPresences = /* GraphQL */ `
  query ListDocumentPresences(
    $filter: ModelDocumentPresenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentPresences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        documentId
        userId
        username
        lastSeen
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDocumentPresences = /* GraphQL */ `
  query SyncDocumentPresences(
    $filter: ModelDocumentPresenceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDocumentPresences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        documentId
        userId
        username
        lastSeen
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
