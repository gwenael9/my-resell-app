<template>
  <div class="flex justify-between items-center py-6 px-12">
    <div class="flex items-center gap-2">
      <a-button type="primary" shape="round">
        <router-link to="/">Accueil</router-link>
      </a-button>
      <div
        class="rounded-full px-6 h-8 bg-white flex items-center gap-6 text-sm"
      >
        <router-link
          to="/articles"
          :class="{
            'text-black': isActiveArticle,
            'text-gray-500': !isActiveArticle,
          }"
          >Articles</router-link
        >
        <router-link
          to="/add"
          :class="{
            'text-black': !isActiveArticle,
            'text-gray-500': isActiveArticle,
          }"
          >Ajouter</router-link
        >
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <a-button
        size="large"
        shape="circle"
        class="flex justify-center items-center"
        ><Heart :size="18"
      /></a-button>
      <a-button
        size="large"
        shape="circle"
        class="flex justify-center items-center"
        ><ShoppingBag :size="18"
      /></a-button>
      <ButtonProfile v-if="userStore.isAuthenticated" />
      <ModalLogin v-else />
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStores";
import ButtonProfile from "../ButtonProfile.vue";
import { Heart, ShoppingBag } from "lucide-vue-next";
import { computed } from "vue";
import { useRoute } from "vue-router";
import ModalLogin from "../Auth/ModalLogin.vue";

export default {
  name: "monHeader",
  components: {
    ButtonProfile,
    Heart,
    ShoppingBag,
    ModalLogin,
  },
  setup() {
    const userStore = useUserStore();
    const route = useRoute();

    const isActiveArticle = computed(() => {
      return route.path === "/articles";
    });

    return {
      userStore,
      isActiveArticle,
    };
  },
};
</script>
