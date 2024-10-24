<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        v-model="email"
        type="text"
        placeholder="Email"
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Mot de passe</label
      >
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
    >
      Se connecter
    </button>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-4">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { login } from "@/api";
import { useUserStore } from "@/stores/userStores";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const userStore = useUserStore();
    const router = useRouter();
    const toast = useToast();

    const handleLogin = async () => {
      try {
        const message = await login(email.value, password.value);
        await userStore.fetchUser();
        router.push("/articles");
        toast.success(message);
      } catch (error) {
        errorMessage.value = "Erreur lors de la connexion.";
      }
    };

    return { email, password, handleLogin, errorMessage };
  },
};
</script>
