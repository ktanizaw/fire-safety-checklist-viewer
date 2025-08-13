<script lang="ts" setup>
import { graphql, getFragmentData, type FragmentType } from "@/gql";
import { AssessmentStatus } from "@/gql/graphql";
import StatusTip from "~/components/atoms/StatusTip.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";

const assessmentCardFragment = graphql(`
  fragment AssessmentCard on Assessment {
    id
    buildingName
    address
    status
    overallCompletionPercentage
    lastUpdated
    pendingActionCount
  }
`);

const props = defineProps<{
  maskedAssessment: FragmentType<typeof assessmentCardFragment>;
}>();

const assessment = getFragmentData(
  assessmentCardFragment,
  props.maskedAssessment
);

const getStatusColor = (status: AssessmentStatus) => {
  switch (status) {
    case AssessmentStatus.InProgress:
      return "blue";
    case AssessmentStatus.Completed:
      return "green";
    case AssessmentStatus.Draft:
      return "yellow";
    case AssessmentStatus.RequiresReview:
      return "red";
  }
};
</script>

<template>
  <div
    class="assessment-card"
    :class="`assessment-card--${getStatusColor(assessment.status)}`"
  >
    <div class="assessment-card__header">
      <Icon name="mdi:office-building" class="assessment-card__icon" />
      <div class="assessment-card__header-left">
        <p class="assessment-card__title">{{ assessment.buildingName }}</p>
        <p class="assessment-card__address">{{ assessment.address }}</p>
      </div>
      <StatusTip
        :color="getStatusColor(assessment.status)"
        :text="assessment.status"
      />
    </div>
    <ProgressBar :value="assessment.overallCompletionPercentage" />
    <div class="assessment-card__pending-actions">
      <Icon name="mdi:alert-outline" class="assessment-card__alert-icon" />
      <p class="assessment-card__pending-actions-text">
        {{ assessment.pendingActionCount }} pending actions
      </p>
    </div>
    <div class="assessment-card__last-updated">
      <Icon
        name="mdi:calendar-blank-outline"
        class="assessment-card__calendar-icon"
      />
      <p class="assessment-card__last-updated-text">
        Last updated {{ new Date(assessment.lastUpdated).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assessment-card {
  padding: 15px 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  }

  &--blue {
    background-color: $color-blue-lighter;
    border: 4px solid $color-blue-light;
  }

  &--green {
    background-color: $color-green-lighter;
    border: 4px solid $color-green-light;
  }

  &--yellow {
    background-color: $color-yellow-lighter;
    border: 4px solid $color-yellow-light;
  }

  &--red {
    background-color: $color-red-lighter;
    border: 4px solid $color-red-light;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  &__icon {
    font-size: 24px;
    color: $color-gray-600;
    flex-shrink: 0;
  }

  &__header-left {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__title {
    @include title16px;
  }

  &__address {
    font-size: $text-sm;
    color: $color-gray-500;
  }

  &__pending-actions {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__alert-icon {
    color: $color-red;
  }

  &__pending-actions-text {
    font-size: $text-sm;
  }

  &__last-updated {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__calendar-icon {
    color: $color-gray-500;
  }

  &__last-updated-text {
    font-size: $text-sm;
    color: $color-gray-500;
  }
}
</style>
