/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDocument = /* GraphQL */ `
  mutation CreateDocument(
    $input: CreateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    createDocument(input: $input, condition: $condition) {
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
export const updateDocument = /* GraphQL */ `
  mutation UpdateDocument(
    $input: UpdateDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    updateDocument(input: $input, condition: $condition) {
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
export const deleteDocument = /* GraphQL */ `
  mutation DeleteDocument(
    $input: DeleteDocumentInput!
    $condition: ModelDocumentConditionInput
  ) {
    deleteDocument(input: $input, condition: $condition) {
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
export const createShare = /* GraphQL */ `
  mutation CreateShare(
    $input: CreateShareInput!
    $condition: ModelShareConditionInput
  ) {
    createShare(input: $input, condition: $condition) {
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
export const updateShare = /* GraphQL */ `
  mutation UpdateShare(
    $input: UpdateShareInput!
    $condition: ModelShareConditionInput
  ) {
    updateShare(input: $input, condition: $condition) {
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
export const deleteShare = /* GraphQL */ `
  mutation DeleteShare(
    $input: DeleteShareInput!
    $condition: ModelShareConditionInput
  ) {
    deleteShare(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createDocumentPresence = /* GraphQL */ `
  mutation CreateDocumentPresence(
    $input: CreateDocumentPresenceInput!
    $condition: ModelDocumentPresenceConditionInput
  ) {
    createDocumentPresence(input: $input, condition: $condition) {
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
export const updateDocumentPresence = /* GraphQL */ `
  mutation UpdateDocumentPresence(
    $input: UpdateDocumentPresenceInput!
    $condition: ModelDocumentPresenceConditionInput
  ) {
    updateDocumentPresence(input: $input, condition: $condition) {
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
export const deleteDocumentPresence = /* GraphQL */ `
  mutation DeleteDocumentPresence(
    $input: DeleteDocumentPresenceInput!
    $condition: ModelDocumentPresenceConditionInput
  ) {
    deleteDocumentPresence(input: $input, condition: $condition) {
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
