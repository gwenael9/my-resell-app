<template>
  <div>
    <ButtonNav :icon="User" @click="open = true" />
    <a-modal v-model:open="open" :footer="null">
      <h2 class="text-2xl">
        {{ variantForm ? "Se connecter" : "Inscription" }}
      </h2>
      <p class="text-gray-500">
        Veuillez renseigner vos informations de
        {{ variantForm ? "connexion" : "compte" }}.
      </p>

      <a-alert v-if="error" :message="error" type="error" show-icon />

      <a-form
        :model="formState"
        @finish="handleFormSubmit"
        layout="vertical"
        class="mt-2"
      >
        <a-form-item
          v-if="!variantForm"
          label="Nom"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formState.user.username" />
        </a-form-item>
        <a-form-item label="Email" :rules="[{ required: true }]">
          <a-input v-model:value="formState.user.email" />
        </a-form-item>

        <a-form-item label="Mot de passe" :rules="[{ required: true }]">
          <a-input-password v-model:value="formState.user.password" />
        </a-form-item>

        <div class="flex justify-between">
          <a-button type="link" class="p-0" @click="changeForm">
            {{ variantForm ? "Pas de compte ?" : "Déjà un compte ?" }}
            <span class="underline ml-1">{{
              variantForm ? "S'inscrire" : "Se connecter"
            }}</span>
          </a-button>
          <a-form-item>
            <a-button class="mr-2" @click="open = false">Retour</a-button>
            <a-button type="primary" html-type="submit" :loading="loading">
              {{ variantForm ? "Se connecter" : "Confirmez" }}
            </a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { User } from "lucide-vue-next";
import ButtonNav from "../Buttons/ButtonNav.vue";
import { login, register } from "@/api";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/userStores";
import { useArticlesStore } from "@/stores/articleStore";
import { usePanierStore } from "@/stores/panierStore";

const userStore = useUserStore();
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();

// ouverture de la modal
const open = ref<boolean>(false);
// true pour connexion sinon création de compte
const variantForm = ref<boolean>(true);
const loading = ref(false);
const formState = reactive({
  user: { username: "", email: "", password: "" },
});

const error = ref<string | null>(null);

const toast = useToast();

const changeForm = () => {
  error.value = null;
  variantForm.value = !variantForm.value;
};

const handleFormSubmit = async () => {
  loading.value = true;

  try {
    let response;

    if (variantForm.value) {
      response = await login(formState.user.email, formState.user.password);
      if (!response.success) {
        error.value = response.message;
        return;
      }
      await userStore.fetchUser();
      await panierStore.fetchPanier();
      await articlesStore.fetchArticles();
      await articlesStore.fetchArticlesLikes();
      open.value = false;
      toast.success(response.message);
    } else {
      response = await register(
        formState.user.email,
        formState.user.username,
        formState.user.password
      );
      if (!response.success) {
        error.value = response.message;
        return;
      }
      toast.success(response.message);
      changeForm();
    }
  } catch (err) {
    console.error("Erreur lors de la soumission du formulaire", err);
    error.value = "Une erreur inattendue s'est produite.";
  } finally {
    loading.value = false;
  }
};

const openLoginModal = () => {
  error.value = null;
  variantForm.value = true;
  open.value = true;
};

onMounted(() => {
  document.addEventListener("open-login-modal", openLoginModal);
});

onUnmounted(() => {
  document.removeEventListener("open-login-modal", openLoginModal);
});
</script>
