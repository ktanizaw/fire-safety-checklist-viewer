<script lang="ts" setup>
import StatusTip from "@/components/atoms/StatusTip.vue";
import { graphql, getFragmentData, type FragmentType } from "@/gql";
import BasicButton from "@/components/atoms/BasicButton.vue";
import { formatDate } from "@/libs/datetime";

const assessmentQuestionFragment = graphql(`
  fragment AssessmentQuestion on AssessmentItem {
    id
    question
    response
    requiresAction
    lastUpdated
    helpText
    notes
  }
`);

const props = defineProps<{
  maskedAssessmentQuestion: FragmentType<typeof assessmentQuestionFragment>;
  index: number;
}>();

const sectionItem = computed(() =>
  getFragmentData(assessmentQuestionFragment, props.maskedAssessmentQuestion)
);

defineEmits(["openActionItemModal"]);
</script>

<template>
  <div class="assessment-question" :key="sectionItem.id">
    <div class="assessment-question__title-wrapper">
      <span class="assessment-question__order">{{ index + 1 }}</span>
      <p>
        {{ sectionItem.question }}
      </p>
    </div>

    <div v-if="sectionItem.helpText" class="assessment-question__help">
      <Icon
        name="mdi:alert-circle-outline"
        class="assessment-question__help-icon"
      />
      <p class="assessment-question__help-text">
        {{ sectionItem.helpText }}
      </p>
    </div>

    <div class="assessment-question__item-wrapper">
      <div class="assessment-question__response">
        <span class="assessment-question__response-label">Response:</span>
        <StatusTip
          v-if="sectionItem.response"
          :color="sectionItem.response === 'yes' ? 'green' : 'red'"
          :text="sectionItem.response === 'yes' ? 'Yes' : 'No'"
        />
        <StatusTip v-else color="yellow" text="Not Answered" />
      </div>
      <p
        v-if="sectionItem.lastUpdated"
        class="assessment-question__last-updated"
      >
        Last updated: {{ formatDate(sectionItem.lastUpdated) }}
      </p>
    </div>

    <div v-if="sectionItem.notes" class="assessment-question__notes">
      <div class="assessment-question__notes-wrapper">
        <Icon name="mdi:note-outline" class="assessment-question__notes-icon" />
        <span class="assessment-question__notes-title">Notes</span>
      </div>
      <p class="assessment-question__notes-text">
        {{ sectionItem.notes }}
      </p>
    </div>

    <BasicButton
      v-if="sectionItem.requiresAction"
      icon="mdi:alert-outline"
      icon-color="red"
      text="View Action Required"
      @click="$emit('openActionItemModal')"
    />
  </div>
</template>

<style lang="scss" scoped>
.assessment-question {
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid $color-gray-200;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__title-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    @include title16px;

    @media (min-width: $breakpoint-sp) {
      @include title14px;
    }
  }

  &__order {
    $size: 24px;
    width: $size;
    height: $size;
    background-color: $color-black;
    color: $color-white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__help {
    background-color: $color-blue-lighter;
    border: 1px solid $color-blue-light;
    border-radius: 4px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__help-icon {
    color: $color-blue;
  }

  &__help-text {
    font-size: $text-xs;
    color: $color-blue;
  }

  &__response {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__response-label {
    color: $color-gray-500;
    font-size: $text-xs;
  }

  &__no-response {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__no-response-label {
    color: $color-gray-500;
    font-size: $text-xs;
  }

  &__no-response-text {
    color: $color-gray-900;
    font-size: $text-xs;
  }

  &__item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__last-updated {
    color: $color-gray-600;
    font-size: $text-xs;
  }

  &__notes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: $color-gray-100;
    border-radius: 4px;
    padding: 5px 10px;
  }

  &__notes-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__notes-icon {
    color: $color-gray-500;
  }

  &__notes-title {
    color: $color-gray-500;
    font-size: $text-xs;
  }

  &__notes-text {
    color: $color-gray-900;
    font-size: $text-xs;
  }
}
</style>
