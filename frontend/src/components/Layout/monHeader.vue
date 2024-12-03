<template>
  <div class="flex justify-between items-center py-6 px-8">
    <button
      @click="router.push('/')"
      class="text-primary font-bold m-0 title text-xl"
    >
      ResellApp
    </button>
    <div class="flex gap-1 sm:gap-2">
      <ButtonNav :icon="Shirt" @click="router.push('/articles')" />
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
    userStore.openLoginModal();
    return;
  }
  router.push("/panier");
};
</script>
