<template>
  <a-config-provider :theme="themeConfig">
    <monHeader />
    <div class="flex-grow mx-8 lg:mx-24">
      <router-view />
    </div>
    <MonFooter />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import monHeader from "./components/Layout/monHeader.vue";
import { useUserStore } from "./stores/userStores";
import { useArticlesStore } from "./stores/articleStore";
import { usePanierStore } from "./stores/panierStore";
import MonFooter from "./components/Layout/monFooter.vue";
import themeConfig from "./themeConfig";

const userStore = useUserStore();
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();

onMounted(async () => {
  await userStore.fetchUser();

  if (userStore.isAuthenticated) {
    articlesStore.fetchArticlesLikes();
    panierStore.fetchPanier();
  }

  articlesStore.fetchArticles();
});
</script>
