<template>
  <a-form
    :model="formState"
    name="form-test"
    :validate-messages="validatesMessages"
    @finish="onFinish"
  >
    <a-form-item
      :name="['user', 'email']"
      label="Email"
      :rules="[{ required: true, message: 'Veuillez renseigner votre email!' }]"
    >
      <a-input v-model:value="formState.user.email" />
    </a-form-item>
    <a-form-item
      :name="['user', 'password']"
      label="Mot de passe"
      :rules="[
        {
          required: true,
          message: 'Veuillez renseigner votre mot de passe!',
        },
      ]"
    >
      <a-input-password v-model:value="formState.user.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { login } from "@/api";
import { useUserStore } from "@/stores/userStores";
import { reactive, defineEmits } from "vue";

const emits = defineEmits<{
  (e: "login-success"): void;
  (e: "login-failure", error: Error): void;
}>();

const validatesMessages = {
  required: "${label} est requis!",
  types: {
    email: "${label} n'est pas un email valide!",
  },
};

const formState = reactive({
  user: {
    email: "",
    password: "",
  },
});

const handleLogin = async () => {
  try {
    await login(formState.user.email, formState.user.password);
    const userStore = useUserStore();
    await userStore.fetchUser();
    emits("login-success"); // Émettre un événement de succès
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    emits("login-failure", error as Error); // Émettre un événement d'échec
  }
};

const onFinish = () => {
  handleLogin();
};
</script>
