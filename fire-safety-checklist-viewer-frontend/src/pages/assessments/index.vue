<script lang="ts" setup>
import { graphql } from '@/gql';
import AssessmentCard from '@/components/compounds/AssessmentCard.vue';
import SelectBox from '@/components/atoms/SelectBox.vue';
import SearchBox from '@/components/atoms/SearchBox.vue';
import { ASSESSMENT_STATUS_OPTIONS } from '@/libs/assessment/status';
import { SortOrder } from '@/gql/graphql';
import LoadingSpinner from '@/components/atoms/LoadingSpinner.vue';
import FadeTransition from '@/components/transition/FadeTransition.vue';
import StatisticsItem from '@/components/compounds/StatisticsItem.vue';
import StatusSummaryCard from '@/components/compounds/StatusSummaryCard.vue';
import { useDebounceFn } from '@vueuse/core';

const assessmentStatisticsDocument = graphql(`
  query assessmentStatistics {
    assessments {
      status
      overallCompletionPercentage
      pendingActionCount
    }
  }
`);

const assessmentIndexDocument = graphql(`
  query assessmentIndex($filter: AssessmentFilter, $sort: AssessmentSort) {
    assessments(filter: $filter, sort: $sort) {
      id
      pendingActionCount
      ...AssessmentCard
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const statusValue = ref<string>('');
const percentageValue = ref<Maybe<SortOrder>>(null);
const searchValue = ref<string>('');

const { data, refresh, pending } = await useRequiredAsyncData(
  'assessment-index',
  async () => {
    const { data: queryData, error } = await client.query(
      assessmentIndexDocument,
      {
        filter: {
          status: statusValue.value || undefined,
          searchQuery: searchValue.value || undefined,
        },
        sort: {
          overallCompletionPercentage: percentageValue.value,
        },
      },
    );

    if (error || !queryData) {
      throw new Error(error?.message || 'Failed to fetch assessmentIndex');
    }

    const { data: statisticsData, error: statisticsError } = await client.query(
      assessmentStatisticsDocument,
      {},
    );

    if (statisticsError || !statisticsData) {
      throw new Error(
        statisticsError?.message || 'Failed to fetch assessmentStatistics',
      );
    }

    return {
      assessments: queryData.assessments,
      statistics: {
        totalCompletedAssessmentsCount: statisticsData.assessments.filter(
          (assessment) => assessment.status === 'completed',
        ).length,
        totalInProgressAssessmentsCount: statisticsData.assessments.filter(
          (assessment) => assessment.status === 'in_progress',
        ).length,
        totalDraftAssessmentsCount: statisticsData.assessments.filter(
          (assessment) => assessment.status === 'draft',
        ).length,
        totalRequiresReviewAssessmentsCount: statisticsData.assessments.filter(
          (assessment) => assessment.status === 'requires_review',
        ).length,
        overallProgressPercentage:
          Math.round(
            statisticsData.assessments.reduce(
              (acc, assessment) =>
                acc + (assessment.overallCompletionPercentage ?? 0),
              0,
            ) / statisticsData.assessments.length,
          ) + '%',
        totalAssessmentsCount: statisticsData.assessments.length,
        pendingActionCount: statisticsData.assessments.reduce(
          (acc, assessment) => acc + (assessment.pendingActionCount ?? 0),
          0,
        ),
      },
    };
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

const COMPLETION_PERCENTAGE_OPTIONS = [
  { label: 'Sort by Completion', value: null },
  { label: 'Most Complete First', value: SortOrder.Desc },
  { label: 'Least Complete First', value: SortOrder.Asc },
];

const refetchData = async () => {
  await refresh();
};

const debouncedRefresh = useDebounceFn(async () => {
  await refresh();
}, 300);

watch(searchValue, async () => {
  await debouncedRefresh();
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
          :value="data.statistics.totalAssessmentsCount"
          icon="mdi:note-text-outline"
        />
        <StatisticsItem
          title="Overall Progress"
          :value="data.statistics.overallProgressPercentage"
          icon="mdi:finance"
        />
        <StatisticsItem
          title="Pending Actions"
          :value="data.statistics.pendingActionCount"
          icon="mdi:alert-outline"
        />
      </div>
      <div class="page__status-summary">
        <p>Assessment Status Summary</p>
        <div class="page__status-summary-cards">
          <StatusSummaryCard
            type="completed"
            :value="data.statistics.totalCompletedAssessmentsCount"
          />
          <StatusSummaryCard
            type="in_progress"
            :value="data.statistics.totalInProgressAssessmentsCount"
          />
          <StatusSummaryCard
            type="draft"
            :value="data.statistics.totalDraftAssessmentsCount"
          />
          <StatusSummaryCard
            type="requires_review"
            :value="data.statistics.totalRequiresReviewAssessmentsCount"
          />
        </div>
      </div>
    </div>
    <div class="page__container">
      <div class="page__filter">
        <SearchBox
          v-model:search-value="searchValue"
          class="page__search-box"
        />
        <SelectBox
          v-model:value="statusValue"
          :options="ASSESSMENT_STATUS_OPTIONS"
          placeholder="All Statuses"
          class="page__select-box"
          @update:value="refetchData"
        />
        <SelectBox
          v-model:value="percentageValue"
          :options="COMPLETION_PERCENTAGE_OPTIONS"
          placeholder="Sort by completion rate"
          class="page__select-box"
          @update:value="refetchData"
        />
      </div>
      <FadeTransition>
        <div v-if="!pending" key="content" class="page__content">
          <div class="page__content-header">
            <p class="page__showing">
              Showing {{ data.assessments.length }} of
              {{ data.statistics.totalAssessmentsCount }}
              assessments
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: $breakpoint-sp) {
      grid-template-columns: repeat(1, 1fr);
    }

    @media (width >= 800px) {
      grid-template-columns: repeat(3, 1fr);
    }
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: $breakpoint-sp) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (width >= 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
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
    gap: 15px;
    align-items: center;

    @media (width <= 800px) {
      flex-wrap: wrap;
    }
  }

  &__select-box {
    flex-shrink: 0;
    width: 180px;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50dvh;
  }
}
</style>
