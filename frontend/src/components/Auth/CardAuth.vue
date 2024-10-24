<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
    <h1 class="text-2xl font-bold text-center mb-4">{{ title }}</h1>
    <div>
      <component :is="formComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";

export default defineComponent({
  name: "cardAuth",
  props: {
    mode: {
      type: String,
      required: true,
      validator: (value: string) => ["register", "login"].includes(value),
    },
  },
  components: {
    RegisterForm,
    LoginForm,
  },
  setup(props) {
    // détermine quel composant de formulaire afficher
    const formComponent = computed(() => {
      return props.mode === "register" ? "RegisterForm" : "LoginForm";
    });

    // détermine le titre à afficher
    const title = computed(() => {
      return props.mode === "register" ? "Inscription" : "Connexion";
    });

    return {
      formComponent,
      title,
    };
  },
});
</script>
