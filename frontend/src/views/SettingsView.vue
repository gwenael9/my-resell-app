<template>
  <div class="mx-8">
    <BreadCrumb
      :crumbs="[
        { label: 'Mon compte', to: '/compte' },
        { label: 'Paramètres' },
      ]"
    />
    <h1 class="text-center font-bold text-lg">Paramètres</h1>
    <div class="text-center">
      <p>{{ userStore.user?.username }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
</script>
