<script lang="ts" setup>
import { graphql } from "@/gql";
import AssessmentCard from "@/components/compounds/AssessmentCard.vue";
import SelectBox from "@/components/atoms/SelectBox.vue";
import { STATUS_OPTIONS } from "@/libs/assessment/status";
// import sortBy from "just-sort-by";

const assessmentIndexDocument = graphql(`
  query assessmentIndex($filter: AssessmentFilter) {
    assessments(filter: $filter) {
      pendingActionCount
      id
      ...AssessmentCard
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const statusValue = ref<string>("");

const { data, refresh } = await useAsyncData(async () => {
  const { data: queryData, error } = await client.query(
    assessmentIndexDocument,
    {
      filter: {
        status: statusValue.value,
      },
    }
  );

  if (error || !queryData) {
    throw new Error(error?.message || "Failed to fetch assessmentIndex");
  }

  return queryData;
});

const shouldShowPendingActions = computed(() => {
  if (!data.value) return false;
  return (
    data.value?.assessments.reduce(
      (acc, assessment) => acc + (assessment.pendingActionCount ?? 0),
      0
    ) > 0
  );
});

const pendingActionCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.reduce(
    (acc, assessment) => acc + (assessment.pendingActionCount ?? 0),
    0
  );
});

// const percentageValue = ref<string>("desc");

// const percentageOptions = [
//   { label: "descending", value: "desc" },
//   { label: "ascending", value: "asc" },
// ];

// const sortedAssessments = computed(() => {
//   if (!data.value) {
//     return;
//   }

//   return sortBy(data.value?.assessments, (assessment) => {
//     const item = getFragmentData(AssessmentCardFragmentDoc, assessment);
//     return item.overallCompletionPercentage;
//   });
// });

const handleStatusChange = () => {
  refresh();
};
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Fire Safety Assessment Status Overview</h1>
      <p class="page__description">
        Monitor and manage building fire safety assessments across all your
        properties
      </p>
    </div>
    <div v-if="data" class="page__content">
      <div class="page__filter">
        <SelectBox
          v-model:value="statusValue"
          :options="STATUS_OPTIONS"
          placeholder="All Statuses"
          class="page__select-box"
          @update:value="handleStatusChange"
        />
        <!-- <SelectBox
          v-model:value="percentageValue"
          :options="percentageOptions"
          placeholder="All Percentages"
          class="page__select-box"
        /> -->
      </div>
      <div class="page__content-header">
        <p class="page__showing">
          Showing {{ data.assessments.length }} of {{ data.assessments.length }}
          buildings
        </p>
        <span v-if="shouldShowPendingActions" class="page__pending-actions">
          {{ pendingActionCount }}
          pending actions
        </span>
      </div>
      <div class="page__assessments">
        <AssessmentCard
          v-for="assessment in data.assessments"
          :key="assessment.id"
          :masked-assessment="assessment"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    @include title24px;
  }

  &__description {
    color: $color-gray-500;
  }

  &__assessments {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;

    @media (min-width: $breakpoint-sp) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__content-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__showing {
    font-size: $text-sm;
    color: $color-gray-500;
  }

  &__pending-actions {
    border-radius: 4px;
    background-color: $color-red-deep;
    color: $color-white;
    padding: 2px 4px;
    font-size: $text-xs;
  }

  &__select-box {
    width: 150px;
  }
}
</style>
