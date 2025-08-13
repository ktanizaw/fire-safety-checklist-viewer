<script lang="ts" setup>
import { graphql } from "@/gql";
import { useAsyncData } from "nuxt/app";
import ChecklistCard from "@/components/compounds/ChecklistCard.vue";

const checklistIndexDocument = graphql(`
  query checklistIndex {
    checklists {
      pendingActionCount
      ...ChecklistCard
    }
  }
`);

const {
  $urql: { client },
} = useNuxtApp();

const { data } = await useAsyncData("checklists", async () => {
  const { data: queryData, error } = await client.query(
    checklistIndexDocument,
    {}
  );

  if (error || !queryData) {
    throw new Error(error?.message || "Failed to fetch checklists");
  }

  return queryData;
});
</script>

<template>
  <div class="page">
    <div class="page__header">
      <h1 class="page__title">Fire Safety Assessment Status Overview</h1>
      <p class="page__description">
        Monitor and manage building fire safety assessments across all your
        properties
      </p>
    </div>
    <div v-if="data" class="page__content">
      <div class="page__content-header">
        <p class="page__showing">
          Showing {{ data.checklists.length }} of {{ data.checklists.length }}
          buildings
        </p>
        <span class="page__pending-actions">
          {{
            data.checklists.reduce(
              (acc, checklist) => acc + (checklist.pendingActionCount ?? 0),
              0
            )
          }}
          pending actions
        </span>
      </div>
      <div class="page__checklists">
        <ChecklistCard
          v-for="(checklist, index) in data.checklists"
          :key="index"
          :masked-checklist="checklist"
        />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__title {
    @include title24px;
  }

  &__description {
    color: $color-gray-500;
  }

  &__checklists {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;

    @media (min-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__content-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__showing {
    font-size: $text-sm;
    color: $color-gray-500;
  }

  &__pending-actions {
    border-radius: 4px;
    background-color: $color-red-deep;
    color: $color-white;
    padding: 2px 4px;
    font-size: $text-xs;
  }
}
</style>
