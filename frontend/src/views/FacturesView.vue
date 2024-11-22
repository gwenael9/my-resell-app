<template>
  <div class="p-4 mx-8">
    <BreadCrumb
      :crumbs="[{ label: 'Mon compte', to: '/compte' }, { label: 'Factures' }]"
    />
    <h2>page de factures</h2>
    <div v-for="facture in facturesStore.factures" :key="facture.id">
      <p>{{ facture.id }}</p>
      <a-button>
        <router-link :to="'/factures/' + facture.id">Voir</router-link>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFacturesStore } from "@/stores/factureStore";
import { onMounted } from "vue";
import BreadCrumb from "@/components/BreadCrumb.vue";

const facturesStore = useFacturesStore();

onMounted(() => {
  facturesStore.fetchFactures();
});
</script>
