<template>
  <a-dropdown placement="bottom" :trigger="['click']">
    <ButtonNav
      :icon="ShoppingBag"
      :numberBadge="panierStore.totalArticlesInPanier"
    />
    <template #overlay>
      <a-menu
        v-if="
          panierStore.totalArticlesInPanier &&
          panierStore.totalArticlesInPanier > 0
        "
      >
        <a-menu-item
          v-for="article in panierStore.panier?.articles"
          :key="article.id"
        >
          <div class="flex justify-between items-center">
            <span>{{ article.title }}</span>
            <a-button type="text" @click="handleRemoveArticle(article.id)">
              <Trash2 :size="12" />
            </a-button>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-button type="link">Voir mon panier</a-button>
      </a-menu>
      <a-menu v-else>
        <a-menu-item>Panier vide</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { ShoppingBag, Trash2 } from "lucide-vue-next";
import ButtonNav from "./ButtonNav.vue";
import { usePanierStore } from "@/stores/panierStore";

const panierStore = usePanierStore();

const handleRemoveArticle = async (articleId: number) => {
  try {
    await panierStore.deleteToPanier(articleId);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article du panier.");
  }
};
</script>
