<script lang="ts" setup>
  import BasicButton from '@/components/atoms/BasicButton.vue';

  const error = useError();

  const handleError = () => {
    clearError({ redirect: '/' });
  };
</script>

<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1>{{ error?.statusCode }} Error</h1>
      <p>{{ error?.message || 'Something went wrong' }}</p>
      <BasicButton
        text="Go Home"
        class="error-page__button"
        @click="handleError"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f8f9fa;

    &__content {
      max-width: 400px;
      padding: 40px;
      text-align: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgb(0 0 0 / 10%);

      h1 {
        margin-bottom: 16px;
        color: #dc3545;
        font-size: 2rem;
      }

      &__status-code {
        margin-bottom: 24px;
        color: #6c757d;
        line-height: 1.5;
      }

      p {
        margin-bottom: 24px;
        color: #6c757d;
        line-height: 1.5;
      }
    }

    &__button {
      margin: 0 auto;
    }
  }
</style>
