<script lang="ts" setup>
import { format } from 'date-fns';
import { graphql, getFragmentData, type FragmentType } from '@/gql';
import StatusTip from '~/components/atoms/StatusTip.vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import { getAssessmentStatusData } from '@/libs/assessment/status';

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
  props.maskedAssessment,
);

const toAssessmentDetail = () => {
  navigateTo(`/assessments/${assessment.id}`);
};
</script>

<template>
  <div
    class="assessment-card"
    :class="`assessment-card--${getAssessmentStatusData(assessment.status).color}`"
    @click="toAssessmentDetail"
  >
    <div class="assessment-card__header">
      <div class="assessment-card__header-left">
        <Icon name="mdi:office-building" class="assessment-card__icon" />
        <div class="assessment-card__wrapper">
          <p class="assessment-card__title">{{ assessment.buildingName }}</p>
          <p class="assessment-card__address">{{ assessment.address }}</p>
        </div>
      </div>
      <StatusTip
        :color="getAssessmentStatusData(assessment.status).color"
        :text="getAssessmentStatusData(assessment.status).text"
      />
    </div>
    <ProgressBar :value="assessment.overallCompletionPercentage" />
    <div class="assessment-card__footer">
      <div
        v-if="
          assessment.pendingActionCount && assessment.pendingActionCount > 0
        "
        class="assessment-card__pending-actions"
      >
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
          Last updated
          {{ format(new Date(assessment.lastUpdated), 'MMM d,yyyy') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assessment-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  padding: 15px 20px;
  border-radius: 10px;
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
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    flex-shrink: 0;
    color: $color-gray-600;
    font-size: 24px;
  }

  &__header-left {
    display: flex;
    gap: 5px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__title {
    @include title16px;
  }

  &__address {
    color: $color-gray-500;
    font-size: $text-sm;
  }

  &__pending-actions {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &__alert-icon {
    color: $color-red;
  }

  &__pending-actions-text {
    font-size: $text-sm;
  }

  &__footer {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__last-updated {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &__calendar-icon {
    color: $color-gray-500;
  }

  &__last-updated-text {
    color: $color-gray-500;
    font-size: $text-sm;
  }
}
</style>
