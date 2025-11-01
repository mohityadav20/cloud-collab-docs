import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Permission {
  READ = "READ",
  WRITE = "WRITE"
}











type EagerDocument = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly description?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly isFavorite?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly ownerEmail: string;
}

type LazyDocument = {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly description?: string | null;
  readonly tags?: (string | null)[] | null;
  readonly isFavorite?: boolean | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly owner: string;
  readonly ownerEmail: string;
}

export declare type Document = LazyLoading extends LazyLoadingDisabled ? EagerDocument : LazyDocument

export declare const Document: (new (init: ModelInit<Document>) => Document) & {
  copyOf(source: Document, mutator: (draft: MutableModel<Document>) => MutableModel<Document> | void): Document;
}

type EagerShare = {
  readonly id: string;
  readonly documentId: string;
  readonly sharedWith: string;
  readonly sharedWithEmail: string;
  readonly permission: Permission | keyof typeof Permission;
  readonly sharedBy: string;
  readonly sharedAt: string;
}

type LazyShare = {
  readonly id: string;
  readonly documentId: string;
  readonly sharedWith: string;
  readonly sharedWithEmail: string;
  readonly permission: Permission | keyof typeof Permission;
  readonly sharedBy: string;
  readonly sharedAt: string;
}

export declare type Share = LazyLoading extends LazyLoadingDisabled ? EagerShare : LazyShare

export declare const Share: (new (init: ModelInit<Share>) => Share) & {
  copyOf(source: Share, mutator: (draft: MutableModel<Share>) => MutableModel<Share> | void): Share;
}

type EagerUserProfile = {
  readonly id: string;
  readonly email: string;
  readonly username?: string | null;
  readonly avatarUrl?: string | null;
  readonly createdAt: string;
}

type LazyUserProfile = {
  readonly id: string;
  readonly email: string;
  readonly username?: string | null;
  readonly avatarUrl?: string | null;
  readonly createdAt: string;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}

type EagerDocumentPresence = {
  readonly id: string;
  readonly documentId: string;
  readonly userId: string;
  readonly username?: string | null;
  readonly lastSeen: string;
}

type LazyDocumentPresence = {
  readonly id: string;
  readonly documentId: string;
  readonly userId: string;
  readonly username?: string | null;
  readonly lastSeen: string;
}

export declare type DocumentPresence = LazyLoading extends LazyLoadingDisabled ? EagerDocumentPresence : LazyDocumentPresence

export declare const DocumentPresence: (new (init: ModelInit<DocumentPresence>) => DocumentPresence) & {
  copyOf(source: DocumentPresence, mutator: (draft: MutableModel<DocumentPresence>) => MutableModel<DocumentPresence> | void): DocumentPresence;
}

type EagerTemplate = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly content: string;
  readonly category?: string | null;
  readonly isPublic?: boolean | null;
  readonly owner: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

type LazyTemplate = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly content: string;
  readonly category?: string | null;
  readonly isPublic?: boolean | null;
  readonly owner: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export declare type Template = LazyLoading extends LazyLoadingDisabled ? EagerTemplate : LazyTemplate

export declare const Template: (new (init: ModelInit<Template>) => Template) & {
  copyOf(source: Template, mutator: (draft: MutableModel<Template>) => MutableModel<Template> | void): Template;
}