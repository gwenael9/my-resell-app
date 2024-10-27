<template>
  <a-config-provider :theme="{ token: { colorPrimary: data.colorPrimary } }">
    <Header />
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Header from "./components/Layout/Header.vue";
import { useUserStore } from "./stores/userStores";
import { useArticlesStore } from "./stores/articleStore";
import { usePanierStore } from "./stores/panierStore";

const defaultData = {
  colorPrimary: "#003d29",
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
