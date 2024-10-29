<template>
  <div class="flex justify-between items-center py-6 px-8">
    <div class="flex items-center gap-2">
      <a-button type="primary" shape="round">
        <router-link to="/">Accueil</router-link>
      </a-button>
      <div
        class="hidden sm:flex rounded-full px-6 h-8 bg-gray-100 items-center gap-6 text-sm"
      >
        <router-link to="/articles">Articles</router-link>
        <router-link to="/add">Ajouter</router-link>
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <ButtonNav :icon="Heart" :numberBadge="articlesStore.likesCount" />
      <ButtonPanier />
      <ButtonProfile v-if="userStore.isAuthenticated" />
      <ModalLogin v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStores";
import ButtonProfile from "../ButtonProfile.vue";
import { Heart } from "lucide-vue-next";
import ModalLogin from "../Auth/ModalLogin.vue";
import ButtonNav from "../ButtonNav.vue";
import { useArticlesStore } from "@/stores/articleStore";
import ButtonPanier from "../ButtonPanier.vue";
const userStore = useUserStore();
const articlesStore = useArticlesStore();
</script>
