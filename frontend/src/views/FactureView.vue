<template>
  <BreadCrumb
    :crumbs="[
      { label: 'Mon compte', to: '/compte' },
      { label: 'Factures', to: { name: 'factures' } },
      { label: `Facture #${factureId}` },
    ]"
  />
  <LoadingComp v-if="loading" />
  <div v-if="facture" class="flex flex-col items-center">
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
            <p>- {{ article.title }}</p>
            <p>{{ article.price }} €</p>
          </div>
        </div>
      </div>

      <div class="border-t pt-4">
        <p class="font-semibold mb-4">Informations de livraison :</p>
        <div class="flex flex-col text-sm">
          <span>{{ facture.user.email }}</span>
          <span>{{ facture.user.adresse }}</span>
          <p>{{ facture.user.city }}, {{ facture.user.cp }}</p>
        </div>
      </div>

      <div class="border-t pt-4">
        <div class="flex justify-between items-center">
          <p>Total achat :</p>
          <p>{{ facture.totalPrice }} €</p>
        </div>
        <div class="flex justify-between items-center">
          <p>Frais de transport :</p>
          <p v-if="facture.taxe > 0">{{ facture.taxe }} €</p>
          <p v-else>Offert</p>
        </div>
        <div class="flex justify-between items-center font-semibold">
          <p>Total déboursé :</p>
          <p>{{ facture.totalPriceTaxe }} €</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!loading && !facture" class="flex flex-col items-center">
    <p>Aucune facture est disponible</p>
    <a-button>
      <router-link to="/factures">Retour</router-link>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { formatDates } from "@/utils/formatDate";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import { Facture } from "@/types";
import { getFactureById } from "@/api";

const route = useRoute();
const factureId = Number(route.params.id);
const loading = ref(true);

const facture = ref<Facture | null>(null);

onMounted(async () => {
  try {
    facture.value = await getFactureById(factureId);
  } catch (error) {
    console.error("Erreur lors de la récupération des factures :", error);
  } finally {
    loading.value = false;
  }
});
</script>
