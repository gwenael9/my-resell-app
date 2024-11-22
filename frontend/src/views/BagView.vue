<template>
  <div class="flex flex-col items-center font-semibold">
    <p class="text-3xl mb-1">Panier</p>
    <p>
      <span class="text-gray-500">
        {{ panierStore.totalArticlesInPanier }} articles
      </span>
      <span> | {{ panierStore.panier?.totalPrice }} €</span>
    </p>
  </div>
  <div class="flex justify-center mx-8">
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
          <div class="flex gap-2">
            <img
              class="rounded-xl bg-gray-100 w-24"
              alt="image ramdom"
              :src="`/img/${article.imageAlt}.png`"
            />
            <div class="flex flex-col">
              <h3 class="font-semibold text-lg">{{ article.title }}</h3>
              <div class="flex flex-col text-gray-500">
                <span>Taille : {{ article.size }}</span>
                <span>Catégorie : {{ article.categorie.name }}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end gap-8">
            <span class="font-semibold">{{ article.price }} €</span>
            <button
              @click="panierStore.handleAddOrDeleteToPanier(article.id)"
              class="hover:text-red-500"
            >
              <Trash2 :size="20" />
            </button>
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
          <span>Frais de port :</span>
          <span>
            {{
              panierStore.panier?.taxe === 0
                ? "Gratuit"
                : `${panierStore.panier?.taxe} €`
            }}
          </span>
        </div>
        <div class="flex justify-between mt-2">
          <span>Total :</span>
          <span> {{ panierStore.panier?.totalPriceTaxe }} € </span>
        </div>
      </div>
      <hr class="my-4" />
      <div class="flex justify-end gap-2 mb-4">
        <a-button>Vider le panier</a-button>
        <a-button type="primary" @click="panierStore.validatePanier">
          Valider le panier
        </a-button>
      </div>
    </div>
    <p v-else>Aucun article dans votre panier actuellement.</p>
  </div>
</template>

<script lang="ts" setup>
import { usePanierStore } from "@/stores/panierStore";
import { Trash2 } from "lucide-vue-next";

const panierStore = usePanierStore();
</script>
