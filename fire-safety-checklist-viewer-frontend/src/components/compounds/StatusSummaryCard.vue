<script lang="ts" setup>
import { getAssessmentStatusData } from '@/libs/assessment/status';

const props = defineProps<{
  value: number;
  type: 'completed' | 'in_progress' | 'draft' | 'requires_review';
}>();

const data = computed(() => {
  return getAssessmentStatusData(props.type);
});
</script>

<template>
  <div
    class="status-summary-card"
    :class="`status-summary-card--${data.color}`"
  >
    <div class="status-summary-card__header">
      <Icon
        :name="data.icon"
        class="status-summary-card__icon"
        :class="`status-summary-card__icon--${data.color}`"
      />
      <p
        class="status-summary-card__title"
        :class="`status-summary-card__title--${data.color}`"
      >
        {{ data.text }}
      </p>
    </div>
    <span
      class="status-summary-card__value"
      :class="`status-summary-card__value--${data.color}`"
      >{{ value }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.status-summary-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border: 1px solid $color-gray-200;
  border-radius: 10px;

  &--green {
    background-color: $color-green-lighter;
    border: 1px solid $color-green-light;
  }

  &--blue {
    background-color: $color-blue-lighter;
    border: 1px solid $color-blue-light;
  }

  &--yellow {
    background-color: $color-yellow-lighter;
    border: 1px solid $color-yellow-light;
  }

  &--red {
    background-color: $color-red-lighter;
    border: 1px solid $color-red-light;
  }

  &__header {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__title {
    font-size: $text-sm;

    &--green {
      color: $color-green;
    }

    &--blue {
      color: $color-blue;
    }

    &--yellow {
      color: $color-yellow;
    }

    &--red {
      color: $color-red;
    }
  }

  &__icon {
    &--green {
      color: $color-green;
    }

    &--blue {
      color: $color-blue;
    }

    &--yellow {
      color: $color-yellow;
    }

    &--red {
      color: $color-red;
    }
  }

  &__value {
    &--green {
      color: $color-green;
    }

    &--blue {
      color: $color-blue;
    }

    &--yellow {
      color: $color-yellow;
    }

    &--red {
      color: $color-red;
    }
  }
}
</style>
