<template>
  <div class="mt-6">
    <h1 class="text-center font-bold text-lg">Mon compte</h1>
    <div class="text-center">
      <p>{{ userStore.user?.username }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
</script>
