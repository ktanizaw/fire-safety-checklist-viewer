<script lang="ts" setup>
defineProps<{
  value: number;
}>();
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__header">
      <span class="progress-bar__label">Progress</span>
      <span class="progress-bar__percentage">{{ Math.round(value) }}%</span>
    </div>
    <div class="progress-bar__container">
      <div class="progress-bar__fill" :style="{ width: `${value}%` }"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    color: #333;
  }

  &__label {
    font-size: 14px;
  }

  &__percentage {
    font-size: 14px;
  }

  &__container {
    width: 100%;
    height: 8px;
    background-color: #e5e5e5;
    border-radius: 4px;
    overflow: hidden;
  }

  &__fill {
    height: 100%;
    background-color: #1a1a1a;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
}
</style>
