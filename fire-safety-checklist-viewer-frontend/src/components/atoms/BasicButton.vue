<script lang="ts" setup>
defineProps<{
  icon?: string;
  iconColor?: string;
  text: string;
  textColor?: string;
}>();

defineEmits(['click']);
</script>

<template>
  <button class="basic-button" @click="$emit('click')">
    <Icon
      v-if="icon"
      :name="icon"
      class="basic-button__icon"
      :class="`basic-button__icon--${iconColor}`"
    />
    <span
      class="basic-button__text"
      :class="`basic-button__text--${textColor}`"
      >{{ text }}</span
    >
  </button>
</template>

<style lang="scss" scoped>
.basic-button {
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  background-color: $color-white;
  border: 1px solid $color-gray-200;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: $color-gray-200;
  }

  &__icon {
    color: $color-gray-600;

    &--red {
      color: $color-red;
    }
  }

  &__text {
    font-size: $text-sm;

    &--red {
      color: $color-red;
    }
  }
}
</style>
