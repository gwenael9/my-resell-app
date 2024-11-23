<template>
  <div class="mx-8">
    <BreadCrumb
      :crumbs="[{ label: 'Mon compte', to: '/compte' }, { label: 'Factures' }]"
    />
    <LoadingComp v-if="loading" />
    <div v-if="factures" class="flex gap-2 justify-center flex-wrap">
      <div
        v-for="facture in factures"
        :key="facture.id"
        class="border w-[250px] p-2 rounded-md"
      >
        <h3 class="font-semibold">Facture n°{{ facture.id }}</h3>
        <p>{{ formatDates(facture.createdAt) }}</p>
        <div class="flex justify-end">
          <router-link :to="{ name: 'facture', params: { id: facture.id } }">
            Voir
          </router-link>
        </div>
      </div>
    </div>
    <h2 class="text-center" v-if="!loading && !factures">
      Aucune facture pour le moment
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { formatDates } from "@/utils/formatDate";
import { getFactures } from "@/api";
import { Facture } from "@/types";
import LoadingComp from "@/components/ui/LoadingComp.vue";

const factures = ref<Facture[] | null>(null);
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
