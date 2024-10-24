<template>
  <div class="relative flex justify-center items-center h-screen bg-gray-100">
    <!-- Bouton pour switcher entre inscription et connexion -->
    <button
      @click="toggleMode"
      class="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      {{ buttonText }}
    </button>

    <!-- Affiche la card avec le formulaire d'inscription ou de connexion selon le mode -->
    <CardAuth :mode="mode" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import CardAuth from "@/components/Auth/CardAuth.vue";

export default {
  components: {
    CardAuth,
  },
  setup() {
    // On initialise le mode à "register" par défaut
    const mode = ref("register");

    // Calcul dynamique pour changer le texte du bouton
    const buttonText = computed(() => {
      return mode.value === "register"
        ? "Déjà inscrit ? Connexion"
        : "Créer un compte";
    });

    // Fonction pour basculer entre "register" et "login"
    const toggleMode = () => {
      mode.value = mode.value === "register" ? "login" : "register";
    };

    return {
      mode,
      buttonText,
      toggleMode,
    };
  },
};
</script>
