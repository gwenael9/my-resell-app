<template>
  <div class="flex justify-between items-center py-6 px-8">
    <a-button type="primary" shape="round">
      <router-link to="/">Accueil</router-link>
    </a-button>
    <div class="flex gap-2">
      <ButtonNav :icon="Shirt" @click="goToArticles" />
      <ModalArticle :isAdd="true" v-if="userStore.isAuthenticated" />
      <ButtonNav :icon="Heart" :numberBadge="articlesStore.likesCount" />
      <ButtonNav
        :icon="ShoppingBag"
        :number-badge="panierStore.totalArticlesInPanier"
        @click="goToPanier"
      />
      <ButtonProfile v-if="userStore.isAuthenticated" />
      <ModalLogin v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStores";
import ButtonProfile from "../Buttons/ButtonProfile.vue";
import { Heart, Shirt, ShoppingBag } from "lucide-vue-next";
import ModalLogin from "../Auth/ModalLogin.vue";
import ButtonNav from "../Buttons/ButtonNav.vue";
import { useArticlesStore } from "@/stores/articleStore";
import ModalArticle from "../Article/ModalArticle.vue";
import { usePanierStore } from "@/stores/panierStore";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();
const router = useRouter();

const goToPanier = () => {
  if (!userStore.isAuthenticated) {
    document.dispatchEvent(new CustomEvent("open-login-modal"));
    return;
  }
  router.push("/panier");
};

const goToArticles = () => {
  router.push("/articles");
};
</script>
