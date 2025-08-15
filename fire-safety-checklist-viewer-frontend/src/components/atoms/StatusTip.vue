<script lang="ts" setup>
defineProps<{
  color: 'blue' | 'green' | 'yellow' | 'red';
  text: string;
}>();
</script>

<template>
  <span class="status-tip" :class="`status-tip--${color}`">
    {{ text }}
  </span>
</template>

<style lang="scss" scoped>
.status-tip {
  display: flex;
  align-items: center;
  width: fit-content;
  height: 18px;
  padding: 2px 4px;
  font-size: $text-xxs;
  border-radius: 4px;

  &--blue {
    color: $color-blue;
    background-color: $color-blue-light;
  }

  &--green {
    color: $color-green;
    background-color: $color-green-light;
  }

  &--yellow {
    color: $color-yellow;
    background-color: $color-yellow-light;
  }

  &--red {
    color: $color-red;
    background-color: $color-red-light;
  }
}
</style>
