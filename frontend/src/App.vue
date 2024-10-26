<template>
  <Header />
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import Header from "./components/Layout/Header.vue";
import { useUserStore } from "./stores/userStores";
import { useArticlesStore } from "./stores/articleStore";

export default {
  name: "App",
  components: {
    Header,
  },
  setup() {
    const userStore = useUserStore();
    const articlesStore = useArticlesStore();

    onMounted(() => {
      if (!userStore.isAuthenticated) {
        userStore.fetchUser();
      }
      articlesStore.fetchArticles();
    });
  },
};
</script>
<style></style>
