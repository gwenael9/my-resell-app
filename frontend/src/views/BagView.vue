<template>
  <ModalConfirm
    :open="showModal"
    title="Vider le panier"
    message="Êtes-vous sûr de vouloir vider votre panier ? Cette action sera irréversible."
    @confirm="panierStore.emptyPanier()"
    @update:open="showModal = $event"
  />
  <div class="flex flex-col items-center font-semibold">
    <p class="text-3xl mb-1">Panier</p>
    <p>
      <span class="text-gray-500">
        {{ panierStore.totalArticlesInPanier }} articles
      </span>
      <span> | {{ panierStore.panier?.totalPrice }} €</span>
    </p>
  </div>
  <div class="flex justify-center">
    <div
      v-if="
        panierStore.totalArticlesInPanier &&
        panierStore.totalArticlesInPanier > 0
      "
      class="max-w-[900px] w-full mt-4"
    >
      <div class="flex flex-col space-y-4">
        <div
          class="flex justify-between border-t pt-4"
          v-for="article in panierStore.panier?.articles"
          :key="article.id"
        >
          <div class="flex gap-2 w-full">
            <img
              class="rounded-xl bg-gray-100 w-24"
              alt="image ramdom"
              :src="`/img/${article.image}.png`"
            />
            <div class="w-full">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-lg m-0">{{ article.title }}</h3>
                <span class="font-semibold">{{ article.price }} €</span>
              </div>
              <div class="flex justify-between items-end mt-2">
                <div class="flex flex-col text-gray-500">
                  <span>Taille : {{ article.size }}</span>
                  <span>Catégorie : {{ article.categorie.name }}</span>
                </div>
                <button
                  @click="panierStore.handleAddOrDeleteToPanier(article.id)"
                  class="hover:text-red-500"
                >
                  <Trash2 :size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-4" />
      <div>
        <h3 class="text-xl">Récapitulatif</h3>
        <div class="flex justify-between">
          <span>Sous-total :</span>
          <span>{{ panierStore.panier?.totalPrice }} €</span>
        </div>
        <div class="flex justify-between">
          <span class="flex items-center gap-1">
            Frais de port
            <a-tooltip placement="top">
              <template #title>
                <span class="text-xs">{{ text }}</span>
              </template>
              <CircleHelp :size="15" />
            </a-tooltip>
            :
          </span>
          <span>
            {{
              panierStore.panier?.taxe === 0
                ? "Gratuit"
                : `${panierStore.panier?.taxe} €`
            }}
          </span>
        </div>
        <div class="flex justify-between mt-2 font-semibold">
          <span>Total :</span>
          <span> {{ panierStore.panier?.totalPriceTaxe }} € </span>
        </div>
      </div>
      <hr class="my-4" />
      <div class="flex justify-end gap-2 mb-4">
        <a-button @click="showModal = true">Vider le panier</a-button>
        <a-button type="primary" @click="panierStore.validatePanier()">
          Valider le panier
        </a-button>
      </div>
    </div>
    <p class="text-center" v-else>
      Aucun article dans votre panier actuellement.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { usePanierStore } from "@/stores/panierStore";
import { Trash2, CircleHelp } from "lucide-vue-next";
import { ref } from "vue";
import ModalConfirm from "@/components/ui/ModalConfirm.vue";

const panierStore = usePanierStore();

const showModal = ref(false);

const text =
  "Les frais de port sont offerts dès 5 articles. Sinon, ils coûtent 2,50 € par article ou 5 € si vous commandez 2 articles ou moins.";
</script>
