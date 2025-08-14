<template>
  <div class="loading-spinner">
    <div class="loading-spinner__content">
      <div class="loading-spinner__spinner" />
      <p class="loading-spinner__text">
        Loading<span class="loading-spinner__dots">...</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 20px;

    &__content {
      text-align: center;
    }

    &__spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 16px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #22c55e;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    &__text {
      margin: 0;
      color: $color-gray-500;
      font-size: $text-lg;
    }

    &__dots {
      animation: dots 1.5s infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dots {
    0%,
    20% {
      opacity: 0;
    }

    40% {
      opacity: 1;
    }

    60%,
    100% {
      opacity: 0;
    }
  }
</style>
