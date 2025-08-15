<script lang="ts" setup>
defineProps<{
  title: string;
  value: number | string;
  icon: string;
}>();
</script>

<template>
  <div class="statistics-item">
    <Icon :name="icon" class="statistics-item__icon" />
    <div class="statistics-item__content">
      <p class="statistics-item__title">{{ title }}</p>
      <p class="statistics-item__value">{{ value }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.statistics-item {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 15px 20px;
  border: 1px solid $color-gray-200;
  border-radius: 10px;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__title {
    color: $color-gray-500;
    font-size: $text-sm;
  }

  &__value {
    font-size: $text-lg;
  }
}
</style>
