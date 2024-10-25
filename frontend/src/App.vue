<template>
  <Header />
  <router-view />
</template>

<script>
import { onMounted } from "vue";
import Header from "./components/Layout/Header.vue";
import { useUserStore } from "./stores/userStores";

export default {
  name: "App",
  components: {
    Header,
  },
  setup() {
    const userStore = useUserStore();

    onMounted(() => {
      if (!userStore.isAuthenticated) {
        userStore.fetchUser();
      }
    });
  },
};
</script>
<style></style>
