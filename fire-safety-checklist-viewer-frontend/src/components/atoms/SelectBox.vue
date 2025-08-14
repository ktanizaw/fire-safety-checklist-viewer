<script setup lang="ts">
  export type Option = {
    label: string;
    value: Maybe<string | number>;
  };

  withDefaults(
    defineProps<{
      options: Option[];
      placeholder?: string;
    }>(),
    {
      placeholder: 'Select an option',
    },
  );

  const value = defineModel<Maybe<string | number>>('value', {
    required: true,
  });
</script>

<template>
  <div class="select-box">
    <div class="select-box__select">
      <select
        v-model="value"
        :placeholder="placeholder"
        class="select-box__input"
      >
        <option
          v-for="(data, i) in options"
          :key="i"
          :value="data.value"
          class="select-box__option"
        >
          {{ data.label }}
        </option>
      </select>
      <Icon name="lucide:chevron-down" class="select-box__arrow" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .select-box {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    user-select: none;

    &__select {
      position: relative;
      display: flex;
      gap: 10px;
      align-items: center;
    }

    &__input {
      display: flex;
      align-items: center;
      width: 100%;
      height: 32px;
      padding: 7px 14px;
      color: $color-black;
      font-size: $text-sm;
      background-color: $color-gray-100;
      border: 1px solid $color-gray-300;
      border-radius: 6px;
      cursor: pointer;
      appearance: none;

      &::placeholder {
        color: $color-gray-500;
      }

      &--focus {
        &:focus {
          border-color: $color-blue;
        }
      }
    }

    &__arrow {
      $size: 12px;

      position: absolute;
      top: 35%;
      right: 16px;
      width: $size;
      height: $size;
      pointer-events: none;
    }

    &__option {
      color: $color-black;
    }
  }
</style>
