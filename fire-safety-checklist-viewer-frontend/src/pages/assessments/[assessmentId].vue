<script lang="ts" setup>
import { graphql } from "@/gql";
import AssessmentInfo from "@/components/compounds/AssessmentInfo.vue";

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
      ...AssessmentInfo
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
    <div v-if="data" class="page__content">
      <AssessmentInfo :maskedAssessment="data.assessmentById" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 20px;

  &__header {
    border: 1px solid $color-gray-200;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
