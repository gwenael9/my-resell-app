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
            <button v-if="userStore.isAuthenticated" @click="logout">
              Déconnexion
            </button>
            <router-link v-else to="/auth">Connexion</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStores";
export default {
  name: "monHeader",
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
      logout: userStore.logoutUser,
    };
  },
};
</script>
