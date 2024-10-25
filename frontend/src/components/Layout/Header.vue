<template>
  <div class="flex justify-between items-center h-20 border-b px-4 uppercase">
    <h1 class="font-semibold text-xl">
      <router-link to="/">Accueil</router-link>
    </h1>
    <div>
      <nav>
        <ul class="flex gap-4 items-center text-sm">
          <li>
            <router-link to="/articles">Articles</router-link>
          </li>
          <li>
            <ButtonProfile v-if="userStore.isAuthenticated" />
            <router-link v-else to="/auth">Connexion</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStores";
import ButtonProfile from "../ButtonProfile.vue";
export default {
  name: "monHeader",
  components: {
    ButtonProfile,
  },
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
    };
  },
};
</script>
