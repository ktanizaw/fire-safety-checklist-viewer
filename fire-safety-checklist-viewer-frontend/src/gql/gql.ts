/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  fragment AssessmentCard on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    pendingActionCount\n  }\n': typeof types.AssessmentCardFragmentDoc;
  '\n  fragment AssessmentInfo on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    responsiblePerson\n    assessor\n    dateOfAssessment\n    useOfPremises\n    numberOfFloors\n    construction\n    maxOccupancy\n    nextReviewDate\n  }\n': typeof types.AssessmentInfoFragmentDoc;
  '\n  fragment AssessmentQuestion on AssessmentItem {\n    id\n    question\n    response\n    requiresAction\n    lastUpdated\n    helpText\n    notes\n  }\n': typeof types.AssessmentQuestionFragmentDoc;
  '\n  fragment AssessmentSectionAccordion on AssessmentSection {\n    id\n    title\n    description\n    order\n    completionPercentage\n    pendingActionCount\n  }\n': typeof types.AssessmentSectionAccordionFragmentDoc;
  '\n  fragment ActionItemModalContent on ActionItem {\n    id\n    deficiency\n    proposedAction\n    timescale\n    personResponsible\n    priority\n    status\n  }\n': typeof types.ActionItemModalContentFragmentDoc;
  '\n  query assessmentDetail($id: ID!) {\n    assessmentById(id: $id) {\n      id\n      ...AssessmentInfo\n      sections {\n        id\n        ...AssessmentSectionAccordion\n        items {\n          id\n          ...AssessmentQuestion\n          actionItem {\n            id\n            ...ActionItemModalContent\n          }\n        }\n      }\n    }\n  }\n': typeof types.AssessmentDetailDocument;
  '\n  query assessmentStatistics {\n    assessments {\n      status\n      overallCompletionPercentage\n      pendingActionCount\n    }\n  }\n': typeof types.AssessmentStatisticsDocument;
  '\n  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {\n    assessments(filter: $filter, sort: $sort) {\n      id\n      pendingActionCount\n      ...AssessmentCard\n    }\n  }\n': typeof types.AssessmentIndexDocument;
};
const documents: Documents = {
  '\n  fragment AssessmentCard on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    pendingActionCount\n  }\n':
    types.AssessmentCardFragmentDoc,
  '\n  fragment AssessmentInfo on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    responsiblePerson\n    assessor\n    dateOfAssessment\n    useOfPremises\n    numberOfFloors\n    construction\n    maxOccupancy\n    nextReviewDate\n  }\n':
    types.AssessmentInfoFragmentDoc,
  '\n  fragment AssessmentQuestion on AssessmentItem {\n    id\n    question\n    response\n    requiresAction\n    lastUpdated\n    helpText\n    notes\n  }\n':
    types.AssessmentQuestionFragmentDoc,
  '\n  fragment AssessmentSectionAccordion on AssessmentSection {\n    id\n    title\n    description\n    order\n    completionPercentage\n    pendingActionCount\n  }\n':
    types.AssessmentSectionAccordionFragmentDoc,
  '\n  fragment ActionItemModalContent on ActionItem {\n    id\n    deficiency\n    proposedAction\n    timescale\n    personResponsible\n    priority\n    status\n  }\n':
    types.ActionItemModalContentFragmentDoc,
  '\n  query assessmentDetail($id: ID!) {\n    assessmentById(id: $id) {\n      id\n      ...AssessmentInfo\n      sections {\n        id\n        ...AssessmentSectionAccordion\n        items {\n          id\n          ...AssessmentQuestion\n          actionItem {\n            id\n            ...ActionItemModalContent\n          }\n        }\n      }\n    }\n  }\n':
    types.AssessmentDetailDocument,
  '\n  query assessmentStatistics {\n    assessments {\n      status\n      overallCompletionPercentage\n      pendingActionCount\n    }\n  }\n':
    types.AssessmentStatisticsDocument,
  '\n  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {\n    assessments(filter: $filter, sort: $sort) {\n      id\n      pendingActionCount\n      ...AssessmentCard\n    }\n  }\n':
    types.AssessmentIndexDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AssessmentCard on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    pendingActionCount\n  }\n',
): (typeof documents)['\n  fragment AssessmentCard on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    pendingActionCount\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AssessmentInfo on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    responsiblePerson\n    assessor\n    dateOfAssessment\n    useOfPremises\n    numberOfFloors\n    construction\n    maxOccupancy\n    nextReviewDate\n  }\n',
): (typeof documents)['\n  fragment AssessmentInfo on Assessment {\n    id\n    buildingName\n    address\n    status\n    overallCompletionPercentage\n    lastUpdated\n    responsiblePerson\n    assessor\n    dateOfAssessment\n    useOfPremises\n    numberOfFloors\n    construction\n    maxOccupancy\n    nextReviewDate\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AssessmentQuestion on AssessmentItem {\n    id\n    question\n    response\n    requiresAction\n    lastUpdated\n    helpText\n    notes\n  }\n',
): (typeof documents)['\n  fragment AssessmentQuestion on AssessmentItem {\n    id\n    question\n    response\n    requiresAction\n    lastUpdated\n    helpText\n    notes\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment AssessmentSectionAccordion on AssessmentSection {\n    id\n    title\n    description\n    order\n    completionPercentage\n    pendingActionCount\n  }\n',
): (typeof documents)['\n  fragment AssessmentSectionAccordion on AssessmentSection {\n    id\n    title\n    description\n    order\n    completionPercentage\n    pendingActionCount\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ActionItemModalContent on ActionItem {\n    id\n    deficiency\n    proposedAction\n    timescale\n    personResponsible\n    priority\n    status\n  }\n',
): (typeof documents)['\n  fragment ActionItemModalContent on ActionItem {\n    id\n    deficiency\n    proposedAction\n    timescale\n    personResponsible\n    priority\n    status\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query assessmentDetail($id: ID!) {\n    assessmentById(id: $id) {\n      id\n      ...AssessmentInfo\n      sections {\n        id\n        ...AssessmentSectionAccordion\n        items {\n          id\n          ...AssessmentQuestion\n          actionItem {\n            id\n            ...ActionItemModalContent\n          }\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query assessmentDetail($id: ID!) {\n    assessmentById(id: $id) {\n      id\n      ...AssessmentInfo\n      sections {\n        id\n        ...AssessmentSectionAccordion\n        items {\n          id\n          ...AssessmentQuestion\n          actionItem {\n            id\n            ...ActionItemModalContent\n          }\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query assessmentStatistics {\n    assessments {\n      status\n      overallCompletionPercentage\n      pendingActionCount\n    }\n  }\n',
): (typeof documents)['\n  query assessmentStatistics {\n    assessments {\n      status\n      overallCompletionPercentage\n      pendingActionCount\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {\n    assessments(filter: $filter, sort: $sort) {\n      id\n      pendingActionCount\n      ...AssessmentCard\n    }\n  }\n',
): (typeof documents)['\n  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {\n    assessments(filter: $filter, sort: $sort) {\n      id\n      pendingActionCount\n      ...AssessmentCard\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
