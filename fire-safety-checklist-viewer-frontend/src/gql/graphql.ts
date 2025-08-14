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
  status: Scalars['String']['output'];
  timescale: Scalars['String']['output'];
};

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
  status: Scalars['String']['output'];
  useOfPremises: Scalars['String']['output'];
};

export type AssessmentFilter = {
  status?: InputMaybe<Scalars['String']['input']>;
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
  pendingActionCount?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type AssessmentSort = {
  overallCompletionPercentage?: InputMaybe<SortOrder>;
};

export type Query = {
  __typename: 'Query';
  assessmentById: Assessment;
  assessments: Array<Assessment>;
};


export type QueryAssessmentByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssessmentsArgs = {
  filter?: InputMaybe<AssessmentFilter>;
  sort?: InputMaybe<AssessmentSort>;
};

/** The sort order for sorting operations */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type AssessmentCardFragment = { __typename: 'Assessment', id: string, buildingName: string, address: string, status: string, overallCompletionPercentage: number, lastUpdated: string, pendingActionCount?: number | null } & { ' $fragmentName'?: 'AssessmentCardFragment' };

export type AssessmentInfoFragment = { __typename: 'Assessment', id: string, buildingName: string, address: string, status: string, overallCompletionPercentage: number, lastUpdated: string, responsiblePerson: string, assessor?: string | null, dateOfAssessment?: string | null, useOfPremises: string, numberOfFloors: number, construction: string, maxOccupancy: number, nextReviewDate?: string | null } & { ' $fragmentName'?: 'AssessmentInfoFragment' };

export type AssessmentQuestionFragment = { __typename: 'AssessmentItem', id: string, question: string, response?: string | null, requiresAction: boolean, lastUpdated?: string | null, helpText?: string | null, notes?: string | null } & { ' $fragmentName'?: 'AssessmentQuestionFragment' };

export type AssessmentSectionAccordionFragment = { __typename: 'AssessmentSection', id: string, title: string, description: string, order: number, completionPercentage: number, pendingActionCount?: number | null } & { ' $fragmentName'?: 'AssessmentSectionAccordionFragment' };

export type AssessmentDetailQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AssessmentDetailQuery = { __typename: 'Query', assessmentById: (
    { __typename: 'Assessment', id: string, sections: Array<(
      { __typename: 'AssessmentSection', id: string, items: Array<(
        { __typename: 'AssessmentItem', id: string, actionItem?: { __typename: 'ActionItem', id: string, deficiency: string, proposedAction: string, timescale: string, personResponsible: string, priority: string, status: string } | null }
        & { ' $fragmentRefs'?: { 'AssessmentQuestionFragment': AssessmentQuestionFragment } }
      )> }
      & { ' $fragmentRefs'?: { 'AssessmentSectionAccordionFragment': AssessmentSectionAccordionFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'AssessmentInfoFragment': AssessmentInfoFragment } }
  ) };

export type AssessmentIndexQueryVariables = Exact<{
  filter?: InputMaybe<AssessmentFilter>;
  sort?: InputMaybe<AssessmentSort>;
}>;


export type AssessmentIndexQuery = { __typename: 'Query', assessments: Array<(
    { __typename: 'Assessment', pendingActionCount?: number | null, id: string }
    & { ' $fragmentRefs'?: { 'AssessmentCardFragment': AssessmentCardFragment } }
  )> };

export const AssessmentCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<AssessmentCardFragment, unknown>;
export const AssessmentInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"responsiblePerson"}},{"kind":"Field","name":{"kind":"Name","value":"assessor"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfAssessment"}},{"kind":"Field","name":{"kind":"Name","value":"useOfPremises"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfFloors"}},{"kind":"Field","name":{"kind":"Name","value":"construction"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"nextReviewDate"}}]}}]} as unknown as DocumentNode<AssessmentInfoFragment, unknown>;
export const AssessmentQuestionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"response"}},{"kind":"Field","name":{"kind":"Name","value":"requiresAction"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<AssessmentQuestionFragment, unknown>;
export const AssessmentSectionAccordionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentSectionAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"completionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<AssessmentSectionAccordionFragment, unknown>;
export const AssessmentDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"assessmentDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessmentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssessmentInfo"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssessmentSectionAccordion"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssessmentQuestion"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deficiency"}},{"kind":"Field","name":{"kind":"Name","value":"proposedAction"}},{"kind":"Field","name":{"kind":"Name","value":"timescale"}},{"kind":"Field","name":{"kind":"Name","value":"personResponsible"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"responsiblePerson"}},{"kind":"Field","name":{"kind":"Name","value":"assessor"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfAssessment"}},{"kind":"Field","name":{"kind":"Name","value":"useOfPremises"}},{"kind":"Field","name":{"kind":"Name","value":"numberOfFloors"}},{"kind":"Field","name":{"kind":"Name","value":"construction"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"nextReviewDate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentSectionAccordion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentSection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"completionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentQuestion"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"response"}},{"kind":"Field","name":{"kind":"Name","value":"requiresAction"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"helpText"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<AssessmentDetailQuery, AssessmentDetailQueryVariables>;
export const AssessmentIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"assessmentIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AssessmentSort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assessments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssessmentCard"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssessmentCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Assessment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingName"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"overallCompletionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"lastUpdated"}},{"kind":"Field","name":{"kind":"Name","value":"pendingActionCount"}}]}}]} as unknown as DocumentNode<AssessmentIndexQuery, AssessmentIndexQueryVariables>;