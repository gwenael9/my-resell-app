<template>
  <h2>Voici votre nouvelle facture</h2>
  <p>{{ facture?.createdAt }}</p>
  <p>{{ facture?.totalPrice }}</p>
</template>

<script lang="ts" setup>
import { useFacturesStore } from "@/stores/factureStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const facturesStore = useFacturesStore();
const factureId = Number(route.params.id);

const facture = computed(() => facturesStore.facture);

onMounted(async () => {
  await facturesStore.fetchOneArticle(factureId);
});
</script>
