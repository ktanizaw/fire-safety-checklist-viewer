<script lang="ts" setup>
import { graphql } from '@/gql';
import AssessmentCard from '@/components/compounds/AssessmentCard.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';
import { ASSESSMENT_STATUS_OPTIONS } from '@/libs/assessment/status';
import { SortOrder } from '@/gql/graphql';
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue';
import FadeTransition from '@/components/transition/FadeTransition.vue';
import StatisticsItem from '~/components/compounds/StatisticsItem.vue';
import StatusSummaryCard from '~/components/compounds/StatusSummaryCard.vue';

const assessmentIndexDocument = graphql(`
  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {
    assessments(filter: $filter, sort: $sort) {
      pendingActionCount
      id
      status
      overallCompletionPercentage
      ...AssessmentCard
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const statusValue = ref<string>('');
const percentageValue = ref<Maybe<SortOrder>>(null);

const { data, refresh, pending } = await useRequiredAsyncData(
  'assessment-index',
  async () => {
    const { data: queryData, error } = await client.query(
      assessmentIndexDocument,
      {
        filter: {
          status: statusValue.value,
        },
        sort: {
          overallCompletionPercentage: percentageValue.value,
        },
      },
    );
    if (error || !queryData) {
      throw new Error(error?.message || 'Failed to fetch assessmentIndex');
    }

    return queryData;
  },
);

const shouldShowPendingActions = computed(() => {
  if (!data.value) return false;
  return (
    data.value?.assessments.reduce(
      (acc, assessment) => acc + (assessment.pendingActionCount ?? 0),
      0,
    ) > 0
  );
});

const pendingActionCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.reduce(
    (acc, assessment) => acc + (assessment.pendingActionCount ?? 0),
    0,
  );
});

const PERCENTAGE_OPTIONS = [
  { label: 'Default', value: null },
  { label: 'Descending', value: SortOrder.Desc },
  { label: 'Ascending', value: SortOrder.Asc },
];

const refetchData = () => {
  refresh();
};

const totalCompletedAssessmentsCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.filter(
    (assessment) => assessment.status === 'completed',
  ).length;
});

const totalInProgressAssessmentsCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.filter(
    (assessment) => assessment.status === 'in_progress',
  ).length;
});

const totalDraftAssessmentsCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.filter(
    (assessment) => assessment.status === 'draft',
  ).length;
});

const totalRequiresReviewAssessmentsCount = computed(() => {
  if (!data.value) return 0;
  return data.value?.assessments.filter(
    (assessment) => assessment.status === 'requires_review',
  ).length;
});

const overallProgressPercentage = computed(() => {
  if (!data.value) return 0;
  const percentage = Math.round(
    data.value?.assessments.reduce(
      (acc, assessment) => acc + (assessment.overallCompletionPercentage ?? 0),
      0,
    ) / data.value?.assessments.length,
  );

  return percentage + '%';
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Fire Safety Assessment Status Overview</h1>
      <p class="page__description">
        Monitor and manage building fire safety assessments across all your
        properties
      </p>
      <div class="page__statistics-data">
        <StatisticsItem
          title="Total Assessments"
          :value="data.assessments.length"
          icon="mdi:note-text-outline"
        />
        <StatisticsItem
          title="Overall Progress"
          :value="overallProgressPercentage"
          icon="mdi:finance"
        />
        <StatisticsItem
          title="Pending Actions"
          :value="pendingActionCount"
          icon="mdi:alert-outline"
        />
      </div>
      <div class="page__status-summary">
        <p>Assessment Status Summary</p>
        <div class="page__status-summary-cards">
          <StatusSummaryCard
            type="completed"
            :value="totalCompletedAssessmentsCount"
          />
          <StatusSummaryCard
            type="in_progress"
            :value="totalInProgressAssessmentsCount"
          />
          <StatusSummaryCard type="draft" :value="totalDraftAssessmentsCount" />
          <StatusSummaryCard
            type="requires_review"
            :value="totalRequiresReviewAssessmentsCount"
          />
        </div>
      </div>
    </div>
    <div class="page__container">
      <div class="page__filter">
        <SelectBox
          v-model:value="statusValue"
          :options="ASSESSMENT_STATUS_OPTIONS"
          placeholder="All Statuses"
          class="page__select-box"
          @update:value="refetchData"
        />
        <SelectBox
          v-model:value="percentageValue"
          :options="PERCENTAGE_OPTIONS"
          placeholder="All Percentages"
          class="page__select-box"
          @update:value="refetchData"
        />
      </div>
      <FadeTransition>
        <div v-if="!pending" key="content" class="page__content">
          <div class="page__content-header">
            <p class="page__showing">
              Showing {{ data.assessments.length }} of
              {{ data.assessments.length }}
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
        <div v-else key="loading" class="page__loading">
          <LoadingSpinner />
        </div>
      </FadeTransition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;

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

  &__statistics-data {
    display: flex;
    gap: 10px;
  }

  &__status-summary {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 20px;
    border: 1px solid $color-gray-200;
    border-radius: 10px;
  }

  &__status-summary-cards {
    display: flex;
    gap: 10px;
  }

  &__assessments {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;

    @media (min-width: $breakpoint-sp) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width >= 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__content-header {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  &__showing {
    color: $color-gray-500;
    font-size: $text-sm;
  }

  &__pending-actions {
    padding: 2px 4px;
    color: $color-white;
    font-size: $text-xs;
    background-color: $color-red-deep;
    border-radius: 4px;
  }

  &__filter {
    display: flex;
    gap: 10px;
  }

  &__select-box {
    width: 150px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50dvh;
  }
}
</style>
