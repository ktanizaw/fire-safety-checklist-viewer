<script lang="ts" setup>
defineProps<{
  color: "blue" | "green" | "yellow" | "red";
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
  border-radius: 4px;
  font-size: $text-xxs;

  &--blue {
    background-color: $color-blue-light;
    color: $color-blue;
  }

  &--green {
    background-color: $color-green-light;
    color: $color-green;
  }

  &--yellow {
    background-color: $color-yellow-light;
    color: $color-yellow;
  }

  &--red {
    background-color: $color-red-light;
    color: $color-red;
  }
}
</style>
