<script lang="ts" setup>
import { Tooltip } from "floating-vue";
import ProgressBar from "@/components/atoms/ProgressBar.vue";
import { graphql, getFragmentData, type FragmentType } from "@/gql";
import StatusTip from "@/components/atoms/StatusTip.vue";

const assessmentSectionFragment = graphql(`
  fragment AssessmentSection on AssessmentSection {
    id
    title
    description
    order
    completionPercentage
    pendingActionCount
  }
`);

const props = defineProps<{
  maskedAssessmentSection: FragmentType<typeof assessmentSectionFragment>;
}>();

const sectionData = getFragmentData(
  assessmentSectionFragment,
  props.maskedAssessmentSection
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
    cursor: pointer;
    padding: 10px 15px;
    &:hover {
      background-color: $color-gray-100;
    }
  }

  &__item-left {
    display: flex;
    align-items: start;
    gap: 8px;
  }

  &__item-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__item-title-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    @include title18px;
  }

  &__progress-bar {
    width: 100px;
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
