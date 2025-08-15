<script lang="ts" setup>
import { Tooltip } from 'floating-vue';
import ProgressBar from '@/components/atoms/ProgressBar.vue';
import { graphql, getFragmentData, type FragmentType } from '@/gql';
import StatusTip from '@/components/atoms/StatusTip.vue';

const assessmentSectionAccordionFragment = graphql(`
  fragment AssessmentSectionAccordion on AssessmentSection {
    id
    title
    description
    order
    completionPercentage
    pendingActionCount
  }
`);

const props = defineProps<{
  maskedAssessmentSectionAccordion: FragmentType<
    typeof assessmentSectionAccordionFragment
  >;
}>();

const sectionData = getFragmentData(
  assessmentSectionAccordionFragment,
  props.maskedAssessmentSectionAccordion,
);

const isOpen = ref(false);
</script>

<template>
  <div class="assessment-section">
    <div class="assessment-section__item" @click="isOpen = !isOpen">
      <div class="assessment-section__item-left">
        <div class="assessment-section__item-title-wrapper">
          <p>{{ sectionData.order }}.</p>
          <p>
            {{ sectionData.title }}
          </p>
        </div>
        <Tooltip>
          <Icon
            name="mdi:help-circle-outline"
            class="assessment-section__help-icon"
          />
          <template #popper>
            <p class="assessment-section__help-text">
              {{ sectionData.description }}
            </p>
          </template>
        </Tooltip>
      </div>

      <div class="assessment-section__item-right">
        <ProgressBar
          :value="sectionData.completionPercentage"
          class="assessment-section__progress-bar"
        />
        <StatusTip
          v-if="sectionData.completionPercentage === 100"
          color="green"
          text="Completed"
        />
        <StatusTip v-else color="blue" text="In Progress" />

        <span
          v-if="sectionData.pendingActionCount"
          class="assessment-section__pending-action-count"
        >
          <Icon name="mdi:alert-outline" />
          {{ sectionData.pendingActionCount }}
        </span>
        <Icon
          :name="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="assessment-section__chevron-icon"
        />
      </div>
    </div>
    <div v-if="isOpen" class="assessment-section__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.assessment-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid $color-gray-200;
  border-radius: 10px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
      background-color: $color-gray-100;
    }
  }

  &__item-left {
    display: flex;
    gap: 8px;
    align-items: start;
  }

  &__item-right {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  &__item-title-wrapper {
    display: flex;
    gap: 4px;
    align-items: center;

    @include title18px;

    @media (min-width: $breakpoint-sp) {
      @include title16px;
    }
  }

  &__progress-bar {
    width: 150px;
  }

  &__pending-action-count {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 2px 4px;
    color: $color-white;
    font-size: $text-xxs;
    background-color: $color-red-deep;
    border-radius: 4px;
  }

  &__help-icon {
    $size: 18px;

    width: $size;
    height: $size;
    color: $color-gray-600;
  }

  &__help-text {
    color: $color-white;
    font-size: $text-xxs;
  }

  &__chevron-icon {
    $size: 18px;

    width: $size;
    height: $size;
    color: $color-gray-600;
  }

  &__content {
    padding: 20px;
  }
}
</style>
