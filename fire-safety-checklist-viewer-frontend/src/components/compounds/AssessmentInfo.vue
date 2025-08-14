<script lang="ts" setup>
import { formatDate } from "@/libs/datetime";
import StatusTip from "~/components/atoms/StatusTip.vue";
import { graphql, getFragmentData, type FragmentType } from "@/gql";
import { getStatusColor } from "@/libs/assessment/status";
import ProgressBar from "@/components/atoms/ProgressBar.vue";
import IconLabel from "~/components/molecules/IconLabel.vue";

const assessmentInfoFragment = graphql(`
  fragment AssessmentInfo on Assessment {
    id
    buildingName
    address
    status
    overallCompletionPercentage
    lastUpdated
    responsiblePerson
    assessor
    dateOfAssessment
    useOfPremises
    numberOfFloors
    construction
    maxOccupancy
    nextReviewDate
  }
`);

const props = defineProps<{
  maskedAssessment: FragmentType<typeof assessmentInfoFragment>;
}>();

const assessment = getFragmentData(
  assessmentInfoFragment,
  props.maskedAssessment
);
</script>

<template>
  <div class="assessment-info">
    <div class="assessment-info__header">
      <div class="assessment-info__header-left">
        <Icon name="mdi:office-building" class="assessment-info__title-icon" />
        <div class="assessment-info__title-wrapper">
          <p class="assessment-info__title">
            {{ assessment.buildingName }}
          </p>
          <div class="assessment-info__address-wrapper">
            <Icon
              name="mdi:map-marker-outline"
              class="assessment-info__address-icon"
            />
            <p class="assessment-info__address">
              {{ assessment.address }}
            </p>
          </div>
          <StatusTip
            :color="getStatusColor(assessment.status)"
            :text="assessment.status"
          />
        </div>
      </div>

      <div class="assessment-info__header-right">
        <ProgressBar :value="assessment.overallCompletionPercentage" />
      </div>
    </div>

    <div class="assessment-info__person-info">
      <div class="assessment-info__person-info-item">
        <IconLabel icon="mdi:account-outline" text="Responsible person" />
        <p class="assessment-info__text">{{ assessment.responsiblePerson }}</p>
      </div>
      <div class="assessment-info__person-info-item">
        <IconLabel icon="mdi:account-outline" text="Fire Safety Assessor" />
        <p class="assessment-info__text">{{ assessment.assessor }}</p>
      </div>
    </div>
    <hr />

    <IconLabel icon="mdi:calendar-blank-outline" text="Assessment Timeline" />

    <div class="assessment-timeline">
      <div class="assessment-timeline__card">
        <p class="assessment-timeline__label">Assessment Date</p>
        <p class="assessment-timeline__value">
          {{ formatDate(assessment.dateOfAssessment ?? "") }}
        </p>
      </div>
      <div class="assessment-timeline__card">
        <p class="assessment-timeline__label">Last Updated</p>
        <p class="assessment-timeline__value">
          {{ formatDate(assessment.lastUpdated) }}
        </p>
      </div>
      <div class="assessment-timeline__card">
        <p class="assessment-timeline__label">Next Review</p>
        <p class="assessment-timeline__value">
          {{ formatDate(assessment.nextReviewDate ?? "") }}
        </p>
      </div>
    </div>

    <hr />

    <IconLabel icon="mdi:office-building" text="Building Information" />

    <div class="assessment-building">
      <div class="assessment-building__card">
        <Icon name="mdi:briefcase-outline" class="assessment-building__icon" />
        <p class="assessment-building__label">Use of Premises</p>
        <p class="assessment-building__value">
          {{ assessment.useOfPremises }}
        </p>
      </div>
      <div class="assessment-building__card">
        <Icon
          name="mdi:layers-triple-outline"
          class="assessment-building__icon"
        />
        <p class="assessment-building__label">Number of Floors</p>
        <p class="assessment-building__value">
          {{ assessment.numberOfFloors }}
        </p>
      </div>
      <div class="assessment-building__card">
        <Icon
          name="mdi:account-group-outline"
          class="assessment-building__icon"
        />
        <p class="assessment-building__label">Max Occupancy</p>
        <p class="assessment-building__value">
          {{ assessment.maxOccupancy }}
        </p>
      </div>
      <div class="assessment-building__card">
        <Icon name="mdi:tools" class="assessment-building__icon" />
        <p class="assessment-building__label">Construction</p>
        <p class="assessment-building__value">
          {{ assessment.construction }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assessment-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  max-width: 960px;
  margin: 0 auto;
  border: 1px solid $color-gray-200;
  border-radius: 12px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: $breakpoint-sp) {
      flex-direction: column;
      gap: 12px;
    }
  }

  &__header-left {
    display: flex;
    gap: 12px;
  }

  &__title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__title-icon {
    $size: 24px;
    width: $size;
    height: $size;
  }

  &__title {
    @include title20px;
  }

  &__address-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__address-icon {
    $size: 12px;
    width: $size;
    height: $size;
  }

  &__address {
    font-size: $text-xs;
    color: $color-gray-500;
  }

  &__header-right {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: flex-end;
    width: 300px;

    @media (max-width: $breakpoint-sp) {
      width: 100%;
      align-items: stretch;
    }
  }

  &__person-info {
    display: flex;
    gap: 20px;
  }

  &__person-info-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__text {
    font-size: $text-sm;
  }

  hr {
    border: 0;
    border-top: 1px solid $color-gray-200;
    margin: 8px 0;
  }
}

.assessment-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: $breakpoint-sp) {
    grid-template-columns: 1fr;
  }

  &__card {
    background-color: $color-gray-50;
    border: 1px solid $color-gray-200;
    border-radius: 12px;
    padding: 16px;
  }

  &__label {
    color: $color-gray-500;
    font-size: $text-sm;
    margin-bottom: 6px;
  }

  &__value {
    @include title14px;
  }
}

.assessment-building {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: $breakpoint-sp) {
    grid-template-columns: repeat(2, 1fr);
  }

  &__card {
    background-color: $color-gray-50;
    border: 1px solid $color-gray-200;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  &__label {
    color: $color-gray-500;
    font-size: $text-sm;
    margin-bottom: 6px;
  }

  &__value {
    @include title14px;
  }

  &__icon {
    $size: 28px;
    width: $size;
    height: $size;
    color: $color-gray-700;
  }
}
</style>
