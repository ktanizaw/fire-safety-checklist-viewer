<script setup lang="ts"></script>

<template>
  <div class="modal">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    min-width: inherit;
    height: 100%;
    overflow-y: scroll;
    background: rgba($color-black, 0.5);
    inset: 0;
  }
</style>
