<template>
  <h2>page de factures</h2>
  <div v-for="facture in facturesStore.factures" :key="facture.id">
    <p>{{ facture.id }}</p>
    <a-button>
      <router-link :to="'/factures/' + facture.id">Voir</router-link>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { useFacturesStore } from "@/stores/factureStore";
import { onMounted } from "vue";

const facturesStore = useFacturesStore();

onMounted(() => {
  facturesStore.fetchFactures();
});
</script>
