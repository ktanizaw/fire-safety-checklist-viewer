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
  <button
    class="basic-button"
    :class="`basic-button--${textColor}`"
    @click="$emit('click')"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="basic-button__icon"
      :class="`basic-button__icon--${iconColor}`"
    />
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.basic-button {
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  font-size: $text-sm;
  background-color: $color-white;
  border: 1px solid $color-gray-200;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &--red {
    color: $color-red;
  }

  &:hover {
    background-color: $color-gray-200;
  }

  &__icon {
    color: $color-gray-600;

    &--red {
      color: $color-red;
    }
  }
}
</style>
