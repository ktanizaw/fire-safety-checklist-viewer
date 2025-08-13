/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ActionItem = {
  __typename: 'ActionItem';
  deficiency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  personResponsible: Scalars['String']['output'];
  priority: Scalars['String']['output'];
  proposedAction: Scalars['String']['output'];
  status: ActionItemStatus;
  timescale: Scalars['String']['output'];
};

/** The status of an action item */
export enum ActionItemStatus {
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type Checklist = {
  __typename: 'Checklist';
  address: Scalars['String']['output'];
  assessor?: Maybe<Scalars['String']['output']>;
  buildingName: Scalars['String']['output'];
  construction: Scalars['String']['output'];
  dateOfAssessment?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['String']['output'];
  maxOccupancy: Scalars['Int']['output'];
  nextReviewDate?: Maybe<Scalars['String']['output']>;
  numberOfFloors: Scalars['Int']['output'];
  overallCompletionPercentage: Scalars['Float']['output'];
  pendingActionCount?: Maybe<Scalars['Int']['output']>;
  responsiblePerson: Scalars['String']['output'];
  sections: Array<ChecklistSection>;
  status: ChecklistStatus;
  useOfPremises: Scalars['String']['output'];
};

export type ChecklistItem = {
  __typename: 'ChecklistItem';
  actionItem?: Maybe<ActionItem>;
  helpText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  requiresAction: Scalars['Boolean']['output'];
  response?: Maybe<Scalars['String']['output']>;
};

export type ChecklistSection = {
  __typename: 'ChecklistSection';
  completionPercentage: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<ChecklistItem>;
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

/** The status of a checklist */
export enum ChecklistStatus {
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  RequiresReview = 'REQUIRES_REVIEW'
}

export type Query = {
  __typename: 'Query';
  checklistById: Checklist;
  checklists: Array<Checklist>;
};


export type QueryChecklistByIdArgs = {
  id: Scalars['String']['input'];
};

export type ChecklistCardFragment = { __typename: 'Checklist', id: string, buildingName: string, address: string, status: ChecklistStatus, overallCompletionPercentage: number, lastUpdated: string, pendingActionCount?: number | null } & { ' $fragmentName'?: 'ChecklistCardFragment' };

export type ChecklistIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type ChecklistIndexQuery = { __typename: 'Query', checklists: Array<(
    { __typename: 'Checklist' }
    & { ' $fragmentRefs'?: { 'ChecklistCardFragment': ChecklistCardFragment } }
  )> };

export const ChecklistCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChecklistCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Checklist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<ChecklistCardFragment, unknown>;
export const ChecklistIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checklistIndex"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checklists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChecklistCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChecklistCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Checklist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<ChecklistIndexQuery, ChecklistIndexQueryVariables>;