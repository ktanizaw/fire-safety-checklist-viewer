<script setup lang="ts">
import { provideClient } from "@urql/vue";

const {
  $urql: { client },
} = useNuxtApp();

provideClient(client);
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
