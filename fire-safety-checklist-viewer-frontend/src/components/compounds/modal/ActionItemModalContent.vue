<script lang="ts" setup>
import StatusTip from '@/components/atoms/StatusTip.vue';
import {
  getActionItemStatusData,
  getActionItemPriorityData,
} from '@/libs/assessment/status';
import { graphql, type FragmentType, getFragmentData } from '@/gql';

const actionItemModalContentFragment = graphql(`
  fragment ActionItemModalContent on ActionItem {
    id
    deficiency
    proposedAction
    timescale
    personResponsible
    priority
    status
  }
`);

const props = defineProps<{
  maskedActionItemModalContentFragment: FragmentType<
    typeof actionItemModalContentFragment
  >;
}>();

const actionItem = getFragmentData(
  actionItemModalContentFragment,
  props.maskedActionItemModalContentFragment,
);

defineEmits(['close']);
</script>

<template>
  <div class="action-item-modal">
    <div class="action-item-modal__header">
      <div class="action-item-modal__title-wrapper">
        <Icon name="mdi:alert-outline" class="action-item-modal__title-icon" />
        <p class="action-item-modal__title">Action Item Details</p>
      </div>
      <button class="action-item-modal__close" @click="$emit('close')">
        <Icon name="mdi:close" />
      </button>
    </div>

    <div class="action-item-modal__content">
      <div class="action-item-modal__row">
        <p class="action-item-modal__label">Deficiency</p>
        <p class="action-item-modal__value">{{ actionItem.deficiency }}</p>
      </div>

      <div class="action-item-modal__row">
        <p class="action-item-modal__label">Proposed Action</p>
        <p class="action-item-modal__value">{{ actionItem.proposedAction }}</p>
      </div>

      <div class="action-item-modal__grid">
        <div class="action-item-modal__cell">
          <p class="action-item-modal__label">Timescale</p>
          <p class="action-item-modal__value">{{ actionItem.timescale }}</p>
        </div>
        <div class="action-item-modal__cell">
          <p class="action-item-modal__label">Responsible</p>
          <p class="action-item-modal__value">
            {{ actionItem.personResponsible }}
          </p>
        </div>
      </div>

      <div class="action-item-modal__grid">
        <div class="action-item-modal__cell">
          <p class="action-item-modal__label">Priority</p>
          <p
            class="action-item-modal__value"
            :class="`action-item-modal__value--${getActionItemPriorityData(actionItem.priority).color}`"
          >
            {{ getActionItemPriorityData(actionItem.priority).text }}
          </p>
        </div>
        <div class="action-item-modal__cell">
          <p class="action-item-modal__label">Status</p>
          <StatusTip
            :color="getActionItemStatusData(actionItem.status).color"
            :text="getActionItemStatusData(actionItem.status).text"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-item-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 600px;
  max-width: calc(100% - 40px);
  padding: 16px;
  background-color: $color-white;
  border: 1px solid $color-gray-200;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba($color-black, 0.2);

  @media (max-width: $breakpoint-sp) {
    width: calc(100% - 20px);
    min-height: 80vh;
    max-height: 90vh;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title-wrapper {
    display: flex;
    gap: 6px;
    align-items: center;
  }

  &__title-icon {
    color: $color-red;
  }

  &__title {
    @include title18px;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: $color-white;
    border: 1px solid $color-gray-200;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $color-gray-100;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: $breakpoint-sp) {
      flex: 1;
      overflow-y: auto;
    }
  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    background-color: $color-gray-100;
    border-radius: 8px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  &__cell {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    background-color: $color-gray-100;
    border-radius: 8px;
  }

  &__label {
    color: $color-gray-600;
    font-size: $text-xs;
  }

  &__value {
    font-size: $text-sm;
    white-space: pre-wrap;

    &--deep-red {
      color: $color-red-deep;
    }

    &--red {
      color: $color-red;
    }

    &--yellow {
      color: $color-yellow;
    }
  }
}
</style>
