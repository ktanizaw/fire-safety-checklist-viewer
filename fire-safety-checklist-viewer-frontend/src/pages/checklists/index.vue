<script lang="ts" setup>
interface ChecklistSummary {
  id: string;
  buildingName: string;
  address: string;
  status: string;
  overallCompletionPercentage: number;
  lastUpdated: string;
  pendingActionCount: number;
}

const {
  public: { apiBase },
} = useRuntimeConfig();

const {
  data: checklists,
  pending,
  error,
  refresh,
} = await useFetch<ChecklistSummary[]>(`${apiBase}/checklists`, {
  key: "checklists",
  onResponseError({ response }) {
    console.error("Failed to fetch checklists:", response._data);
  },
});
</script>

<template>
  <div class="checklists-page">
    <pre>{{ checklists }}</pre>
  </div>
</template>

<style lang="scss" scoped></style>
