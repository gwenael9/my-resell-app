<template>
  <a-dropdown placement="bottom" :trigger="['click']" v-model:open="visible">
    <ButtonNav
      :icon="ShoppingBag"
      :numberBadge="panierStore.totalArticlesInPanier"
    />
    <template #overlay>
      <a-menu
        @click="handleMenuClick"
        v-if="
          panierStore.totalArticlesInPanier &&
          panierStore.totalArticlesInPanier > 0
        "
      >
        <a-menu-item>{{ panierStore.totalArticlesInPanier }}</a-menu-item>
        <a-menu-item
          v-for="article in panierStore.panier?.articles"
          :key="article.id"
        >
          <div class="flex justify-between items-center">
            <span>{{ article.title }}</span>
            <button @click="handleRemoveArticle(article.id)">
              <Trash2 :size="12" />
            </button>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-button type="link">
          <router-link to="/panier">Voir mon panier</router-link>
        </a-button>
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
import { ref } from "vue";
import { MenuProps } from "ant-design-vue";

const panierStore = usePanierStore();
const visible = ref(false);

const handleMenuClick: MenuProps["onClick"] = (e) => {
  if (e.key === "3") {
    visible.value = false;
  }
};

const handleRemoveArticle = async (articleId: number) => {
  try {
    await panierStore.deleteToPanier(articleId);
  } catch (error) {
    console.error("Erreur lors de la suppression de l'article du panier.");
  }
};
</script>
