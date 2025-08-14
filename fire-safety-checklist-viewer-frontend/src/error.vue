<script lang="ts" setup>
import BasicButton from "@/components/atoms/BasicButton.vue";

const error = useError();

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1>{{ error?.statusCode }} Error</h1>
      <p>{{ error?.message || "Something went wrong" }}</p>
      <BasicButton
        text="Go Home"
        @click="handleError"
        class="error-page__button"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;

  &__content {
    text-align: center;
    max-width: 400px;
    padding: 40px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h1 {
      color: #dc3545;
      margin-bottom: 16px;
      font-size: 2rem;
    }

    &__status-code {
      color: #6c757d;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    p {
      color: #6c757d;
      margin-bottom: 24px;
      line-height: 1.5;
    }
  }

  &__button {
    margin: 0 auto;
  }
}
</style>
