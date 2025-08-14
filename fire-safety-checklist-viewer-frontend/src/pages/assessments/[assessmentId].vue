<script lang="ts" setup>
import { graphql } from "@/gql";

const assessmentDetailDocument = graphql(`
  query assessmentDetail($id: ID!) {
    assessmentById(id: $id) {
      id
      buildingName
      address
      responsiblePerson
      assessor
      dateOfAssessment
      useOfPremises
      numberOfFloors
      construction
      maxOccupancy
      status
      overallCompletionPercentage
      lastUpdated
      nextReviewDate
      sections {
        id
        title
        description
        order
        completionPercentage
        items {
          id
          question
          response
          requiresAction
          lastUpdated
          helpText
          notes
          actionItem {
            id
            deficiency
            proposedAction
            timescale
            personResponsible
            priority
            status
          }
        }
      }
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const {
  params: { assessmentId },
} = useRoute("assessments-assessmentId");

const { data } = await useAsyncData("assessmentDetail", async () => {
  const { data: queryData, error } = await client.query(
    assessmentDetailDocument,
    {
      id: assessmentId,
    }
  );

  if (error || !queryData) {
    throw new Error(error?.message || "Failed to fetch assessmentDetail");
  }

  return queryData;
});
</script>

<template>
  <div class="page">
    <div class="page__header"></div>
    <pre v-if="data">
        {{ data }}
    </pre>
  </div>
</template>

<style lang="scss" scoped></style>
