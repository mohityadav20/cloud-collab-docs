/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument {
    onCreateDocument {
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
export const onUpdateDocument = /* GraphQL */ `
  subscription OnUpdateDocument {
    onUpdateDocument {
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
export const onDeleteDocument = /* GraphQL */ `
  subscription OnDeleteDocument {
    onDeleteDocument {
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
export const onCreateShare = /* GraphQL */ `
  subscription OnCreateShare {
    onCreateShare {
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
export const onUpdateShare = /* GraphQL */ `
  subscription OnUpdateShare {
    onUpdateShare {
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
export const onDeleteShare = /* GraphQL */ `
  subscription OnDeleteShare {
    onDeleteShare {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile {
    onCreateUserProfile {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile {
    onUpdateUserProfile {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile {
    onDeleteUserProfile {
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
export const onCreateDocumentPresence = /* GraphQL */ `
  subscription OnCreateDocumentPresence {
    onCreateDocumentPresence {
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
export const onUpdateDocumentPresence = /* GraphQL */ `
  subscription OnUpdateDocumentPresence {
    onUpdateDocumentPresence {
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
export const onDeleteDocumentPresence = /* GraphQL */ `
  subscription OnDeleteDocumentPresence {
    onDeleteDocumentPresence {
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
