<template>
  <BreadCrumb
    :crumbs="[{ label: 'Mon compte', to: '/compte' }, { label: 'Paramètres' }]"
  />
  <h1 class="text-center font-bold text-lg">Paramètres</h1>
  <div class="text-center">
    <p>{{ userStore.user?.username }}</p>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { useUserStore } from "@/stores/userStores";
const userStore = useUserStore();
</script>
