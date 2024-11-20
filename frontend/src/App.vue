<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: data.colorPrimary,
        colorLinkHover: data.colorPrimary,
        colorLink: data.colorLink,
      },
    }"
  >
    <monHeader />
    <router-view />
    <MonFooter />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import monHeader from "./components/Layout/monHeader.vue";
import { useUserStore } from "./stores/userStores";
import { useArticlesStore } from "./stores/articleStore";
import { usePanierStore } from "./stores/panierStore";
import MonFooter from "./components/Layout/monFooter.vue";

const defaultData = {
  colorPrimary: "#003d29",
  colorLink: "#000",
};
const data = ref(defaultData);

const userStore = useUserStore();
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();

onMounted(() => {
  if (!userStore.isAuthenticated) {
    userStore.fetchUser();
  }
  articlesStore.fetchArticles();
  articlesStore.fetchArticlesLikes();
  panierStore.fetchPanier();
});
</script>
<style></style>
