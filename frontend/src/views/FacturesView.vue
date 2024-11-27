<template>
  <BreadCrumb
    :crumbs="[{ label: 'Mon compte', to: '/compte' }, { label: 'Factures' }]"
  />
  <LoadingComp v-if="loading" />
  <h2 class="text-xl font-semibold mb-4 text-left max-w-4xl w-full">
    Toutes nos factures
  </h2>
  <div
    v-if="factures"
    class="flex flex-row-reverse gap-2 justify-center flex-wrap-reverse"
  >
    <div
      v-for="facture in factures"
      :key="facture.id"
      class="shadow-md border border-gray-200 w-[250px] p-4 rounded-lg hover:shadow-lg transition-shadow"
    >
      <router-link
        :to="{ name: 'facture', params: { id: facture.id } }"
        class="hover:text-primary transition-colors"
      >
        <h3 class="font-semibold text-lg mb-2">Facture #{{ facture.id }}</h3>
        <p class="text-sm text-gray-500">
          {{ formatDates(facture.createdAt) }}
        </p>
        <div class="flex justify-between items-center">
          <p class="text-sm font-semibold m-0">
            {{ facture.totalPriceTaxe }} €
          </p>
          <a-button><ArrowRight /></a-button>
        </div>
      </router-link>
    </div>
  </div>
  <h2 class="text-center" v-if="!loading && factures.length == 0">
    Aucune facture pour le moment
  </h2>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { formatDates } from "@/utils/formatDate";
import { getFactures } from "@/api";
import { Facture } from "@/types";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import { ArrowRight } from "lucide-vue-next";

const factures = ref<Facture[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    factures.value = await getFactures();
  } catch (error) {
    console.error("Erreur lors de la récupération des factures :", error);
  } finally {
    loading.value = false;
  }
});
</script>
