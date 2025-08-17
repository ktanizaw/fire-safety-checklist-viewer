<script lang="ts" setup>
const searchValue = defineModel<string>('searchValue', { required: true });
</script>

<template>
  <div class="search-box">
    <div class="search-box__icon">
      <Icon name="mdi:magnify" size="20" />
    </div>
    <input
      v-model="searchValue"
      placeholder="Search buildings or addresses..."
      type="text"
      class="search-box__input"
    >
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &__icon {
    position: absolute;
    left: 12px;
    color: $color-gray-500;
  }

  &__input {
    width: 100%;
    padding: 8px 8px 8px 40px;
    color: $color-gray-900;
    font-size: $text-sm;
    background-color: $color-gray-100;
    border: 1px solid $color-gray-200;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: $color-gray-500;
    }

    &:focus {
      background-color: $color-white;
      border-color: $color-gray-700;
      box-shadow: 0 0 0 3px rgb(59 130 246 / 10%);
    }

    &:disabled {
      color: $color-gray-400;
      background-color: $color-gray-50;
      cursor: not-allowed;
    }
  }
}
</style>
