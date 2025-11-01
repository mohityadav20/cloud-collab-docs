/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocument = /* GraphQL */ `
  subscription OnCreateDocument {
    onCreateDocument {
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
      description
      tags
      isFavorite
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
      description
      tags
      isFavorite
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
  subscription OnCreateUserProfile($owner: String!) {
    onCreateUserProfile(owner: $owner) {
      id
      email
      username
      avatarUrl
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile($owner: String!) {
    onUpdateUserProfile(owner: $owner) {
      id
      email
      username
      avatarUrl
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile($owner: String!) {
    onDeleteUserProfile(owner: $owner) {
      id
      email
      username
      avatarUrl
      createdAt
      _version
      _deleted
      _lastChangedAt
      updatedAt
      owner
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
export const onCreateTemplate = /* GraphQL */ `
  subscription OnCreateTemplate {
    onCreateTemplate {
      id
      name
      description
      content
      category
      isPublic
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateTemplate = /* GraphQL */ `
  subscription OnUpdateTemplate {
    onUpdateTemplate {
      id
      name
      description
      content
      category
      isPublic
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteTemplate = /* GraphQL */ `
  subscription OnDeleteTemplate {
    onDeleteTemplate {
      id
      name
      description
      content
      category
      isPublic
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
