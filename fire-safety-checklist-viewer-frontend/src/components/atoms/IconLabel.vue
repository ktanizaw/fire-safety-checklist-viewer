<script lang="ts" setup>
  defineProps<{
    icon: string;
    text: string;
  }>();
</script>

<template>
  <div class="icon-label">
    <Icon :name="icon" class="icon-label__icon" />
    <p class="icon-label__text">{{ text }}</p>
  </div>
</template>

<style lang="scss" scoped>
  .icon-label {
    display: flex;
    gap: 5px;
    align-items: center;

    &__text {
      font-size: $text-sm;
    }
  }
</style>
