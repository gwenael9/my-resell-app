<template>
  <form @submit.prevent="handleRegister">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
      <input
        v-model="email"
        type="email"
        placeholder="Adresse Email"
        class="w-full px-3 py-2 border rounded"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2"
        >Nom d'utilisateur</label
      >
      <input
        v-model="username"
        type="text"
        placeholder="Nom d'utilisateur"
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
      S'inscrire
    </button>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-4">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { register } from "@/api";

export default {
  setup() {
    const email = ref("");
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const handleRegister = async () => {
      try {
        const response = await register(
          email.value,
          username.value,
          password.value
        );
        alert(response.message);
      } catch (error) {
        errorMessage.value = "Erreur lors de l'inscription.";
      }
    };

    return { email, username, password, handleRegister, errorMessage };
  },
};
</script>
