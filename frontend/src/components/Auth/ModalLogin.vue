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

      <a-form
        :model="formState"
        name="form-test"
        @finish="variantForm ? handleLogin : handleRegister"
        layout="vertical"
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
      </a-form>

      <div class="flex justify-between">
        <a-button type="link" class="p-0" @click="changeForm">
          {{ variantForm ? "Pas de compte ?" : "Déjà un compte ?" }}
          <span class="underline ml-1">{{
            variantForm ? "S'inscrire" : "Se connecter"
          }}</span>
        </a-button>
        <div class="flex gap-3">
          <a-button @click="open = false">Retour</a-button>
          <a-button
            type="primary"
            :loading="loading"
            @click="variantForm ? handleLogin() : handleRegister()"
          >
            {{ variantForm ? "Se connecter" : "Confirmez" }}
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { User } from "lucide-vue-next";
import { login, register } from "@/api";
import { useUserStore } from "@/stores/userStores";
import { useToast } from "vue-toastification";
import { useArticlesStore } from "@/stores/articleStore";
import ButtonNav from "../ButtonNav.vue";
import { usePanierStore } from "@/stores/panierStore";

// ouverture de la modal
const open = ref<boolean>(false);
// true pour connexion sinon création de compte
const variantForm = ref<boolean>(true);
const loading = ref(false);
const formState = reactive({
  user: { username: "", email: "", password: "" },
});
const toast = useToast();
const userStore = useUserStore();
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();

const changeForm = () => {
  variantForm.value = !variantForm.value;
};

const handleRegister = async () => {
  loading.value = true;
  try {
    const message = await register(
      formState.user.email,
      formState.user.username,
      formState.user.password
    );
    toast.success(message);
    changeForm();
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    loading.value = false;
  }
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const message = await login(formState.user.email, formState.user.password);
    await userStore.fetchUser();
    await articlesStore.fetchArticles();
    await articlesStore.fetchArticlesLikes();
    await panierStore.fetchPanier();
    open.value = false;
    toast.success(message);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    loading.value = false;
  }
};

const openLoginModal = () => {
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
