<script lang="ts" setup>
import BasicButton from '@/components/atoms/BasicButton.vue';

const toAssessments = () => {
  navigateTo('/assessments');
};
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Fire Safety Checklist Viewer</h1>
      <BasicButton text="Check Assessment Status" @click="toAssessments" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  height: 100vh;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 200px;
  }
}
</style>
