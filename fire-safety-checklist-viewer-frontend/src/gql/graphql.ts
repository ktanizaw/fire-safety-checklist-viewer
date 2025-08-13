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

export type Assessment = {
  __typename: 'Assessment';
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
  sections: Array<AssessmentSection>;
  status: AssessmentStatus;
  useOfPremises: Scalars['String']['output'];
};

export type AssessmentItem = {
  __typename: 'AssessmentItem';
  actionItem?: Maybe<ActionItem>;
  helpText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastUpdated?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  requiresAction: Scalars['Boolean']['output'];
  response?: Maybe<Scalars['String']['output']>;
};

export type AssessmentSection = {
  __typename: 'AssessmentSection';
  completionPercentage: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<AssessmentItem>;
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

/** The status of an assessment */
export enum AssessmentStatus {
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  RequiresReview = 'REQUIRES_REVIEW'
}

export type Query = {
  __typename: 'Query';
  assessmentById: Assessment;
  assessments: Array<Assessment>;
};


export type QueryAssessmentByIdArgs = {
  id: Scalars['String']['input'];
};

export type AssessmentCardFragment = { __typename: 'Assessment', id: string, buildingName: string, address: string, status: AssessmentStatus, overallCompletionPercentage: number, lastUpdated: string, pendingActionCount?: number | null } & { ' $fragmentName'?: 'AssessmentCardFragment' };

export type AssessmentIndexQueryVariables = Exact<{ [key: string]: never; }>;


export type AssessmentIndexQuery = { __typename: 'Query', assessments: Array<(
    { __typename: 'Assessment', pendingActionCount?: number | null }
    & { ' $fragmentRefs'?: { 'AssessmentCardFragment': AssessmentCardFragment } }
  )> };

export const AssessmentCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<AssessmentCardFragment, unknown>;
export const AssessmentIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"assessmentIndex"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssessmentCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<AssessmentIndexQuery, AssessmentIndexQueryVariables>;