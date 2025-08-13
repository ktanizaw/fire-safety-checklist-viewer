<script lang="ts" setup>
import { gql, useQuery } from "@urql/vue";

const { data: checklists } = useQuery({
  query: gql`
    {
      checklists {
        id
        buildingName
        address
        status
        overallCompletionPercentage
        lastUpdated
        pendingActionCount
      }
    }
  `,
});
</script>

<template>
  <div class="page">
    <h1>Fire Safety Assessment Status Overview</h1>
    <p class="page__description">
      Monitor and manage building fire safety assessments across all your
      properties
    </p>
    <div class="page__checklists"></div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &__description {
    color: $color-gray-500;
  }

  &__checklists {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }
}
</style>
