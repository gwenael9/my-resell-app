<template>
  <div class="p-6 max-w-4xl mx-8">
    <h2 class="text-xl font-semibold mb-4">Voici votre nouvelle facture</h2>

    <div class="border p-4 rounded-md">
      <div class="mb-6">
        <p>
          <span class="font-semibold">Date d'achat :</span>
          {{ formatDates(facture?.createdAt) }}
        </p>
      </div>

      <div class="border-t pt-4">
        <p class="font-semibold mb-4">Détail des articles :</p>
        <div v-for="article in facture?.articles" :key="article.id">
          <div class="flex justify-between text-sm">
            <p>{{ article.title }}</p>
            <p>{{ article.price }} €</p>
          </div>
        </div>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center">
          <p>Total achat :</p>
          <p>{{ facture?.totalPrice }} €</p>
        </div>
        <div class="flex justify-between items-center">
          <p>Frais de transport :</p>
          <p>{{ facture?.taxe }} €</p>
        </div>
        <div class="flex justify-between items-center">
          <p>Total déboursé :</p>
          <p>{{ facture?.totalPriceTaxe }} €</p>
        </div>
      </div>
      <!-- Résumé de la facture -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFacturesStore } from "@/stores/factureStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const route = useRoute();
const facturesStore = useFacturesStore();
const factureId = Number(route.params.id);

const facture = computed(() => facturesStore.facture);

console.log(facture.value);

// Formater la date
const formatDates = (date: Date | undefined) => {
  if (!date) {
    return;
  }
  return format(date, "dd/MM/yyyy HH:mm", { locale: fr });
};

onMounted(async () => {
  await facturesStore.fetchOneArticle(factureId);
});
</script>
