<script lang="ts" setup>
import { graphql, getFragmentData, type FragmentType } from "@/gql";
import { ChecklistStatus } from "@/gql/graphql";
import StatusTip from "~/components/atoms/StatusTip.vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";

const checklistCardFragment = graphql(`
  fragment ChecklistCard on Checklist {
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
  maskedChecklist: FragmentType<typeof checklistCardFragment>;
}>();

const checklist = getFragmentData(checklistCardFragment, props.maskedChecklist);

const getStatusColor = (status: ChecklistStatus) => {
  switch (status) {
    case ChecklistStatus.InProgress:
      return "blue";
    case ChecklistStatus.Completed:
      return "green";
    case ChecklistStatus.Draft:
      return "yellow";
    case ChecklistStatus.RequiresReview:
      return "red";
  }
};
</script>

<template>
  <div
    class="checklist-card"
    :class="`checklist-card--${getStatusColor(checklist.status)}`"
  >
    <div class="checklist-card__header">
      <Icon name="mdi:office-building" class="checklist-card__icon" />
      <div class="checklist-card__header-left">
        <p class="checklist-card__title">{{ checklist.buildingName }}</p>
        <p class="checklist-card__address">{{ checklist.address }}</p>
      </div>
      <StatusTip
        :color="getStatusColor(checklist.status)"
        :text="checklist.status"
      />
    </div>
    <ProgressBar :value="checklist.overallCompletionPercentage" />
    <div class="checklist-card__pending-actions">
      <Icon name="mdi:alert-outline" class="checklist-card__alert-icon" />
      <p class="checklist-card__pending-actions-text">
        {{ checklist.pendingActionCount }} pending actions
      </p>
    </div>
    <div class="checklist-card__last-updated">
      <Icon
        name="mdi:calendar-blank-outline"
        class="checklist-card__calendar-icon"
      />
      <p class="checklist-card__last-updated-text">
        Last updated {{ new Date(checklist.lastUpdated).toLocaleDateString() }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checklist-card {
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
