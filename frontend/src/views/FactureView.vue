<template>
  <div v-if="facture" class="p-4 mx-8">
    <BreadCrumb
      :crumbs="[
        { label: 'Mon compte', to: '/compte' },
        { label: 'Factures', to: '/factures' },
        { label: `Facture #${factureId}` },
      ]"
    />
    <div class="flex flex-col items-center">
      <h2 class="text-xl font-semibold mb-4 text-left max-w-4xl w-full">
        Voici votre facture n°{{ factureId }}
      </h2>
      <div class="border p-4 max-w-4xl w-full rounded-md">
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
          <div class="flex justify-between items-center font-semibold">
            <p>Total déboursé :</p>
            <p>{{ facture?.totalPriceTaxe }} €</p>
          </div>
        </div>
        <!-- Résumé de la facture -->
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center">
    <p>Aucune facture est disponible</p>
    <a-button>
      <router-link to="/factures">Retour</router-link>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { useFacturesStore } from "@/stores/factureStore";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import BreadCrumb from "@/components/BreadCrumb.vue";

const route = useRoute();
const facturesStore = useFacturesStore();
const factureId = Number(route.params.id);

const facture = computed(() => facturesStore.facture);

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
