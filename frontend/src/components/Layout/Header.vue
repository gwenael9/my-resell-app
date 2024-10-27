<template>
  <div class="flex justify-between items-center py-6 px-12">
    <div class="flex items-center gap-2">
      <a-button type="primary" shape="round">
        <router-link to="/">Accueil</router-link>
      </a-button>
      <div
        class="rounded-full px-6 h-8 bg-white flex items-center gap-6 text-sm"
      >
        <router-link to="/articles">Articles</router-link>
        <router-link to="/add">Ajouter</router-link>
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <ButtonNav :icon="Heart" :numberBadge="articlesStore.likesCount" />
      <ButtonNav :icon="ShoppingBag" />
      <ButtonProfile v-if="userStore.isAuthenticated" />
      <ModalLogin v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/userStores";
import ButtonProfile from "../ButtonProfile.vue";
import { Heart, ShoppingBag } from "lucide-vue-next";
import ModalLogin from "../Auth/ModalLogin.vue";
import ButtonNav from "../ButtonNav.vue";
import { useArticlesStore } from "@/stores/articleStore";

export default {
  name: "monHeader",
  components: {
    ButtonProfile,
    ButtonNav,
    ModalLogin,
  },
  setup() {
    const userStore = useUserStore();
    const articlesStore = useArticlesStore();

    return {
      userStore,
      Heart,
      ShoppingBag,
      articlesStore,
    };
  },
};
</script>
