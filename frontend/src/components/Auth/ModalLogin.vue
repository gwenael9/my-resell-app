<template>
  <div>
    <ButtonNav :icon="User" @click="open = true" />
    <a-modal v-model:open="open" :footer="null">
      <h2 class="text-2xl">{{ testLog ? "Se connecter" : "Inscription" }}</h2>
      <p class="text-gray-500">
        Veuillez renseigner vos informations de
        {{ testLog ? "connexion" : "compte" }}.
      </p>

      <a-form
        :model="formState"
        name="form-test"
        @finish="testLog ? handleLogin : handleRegister"
      >
        <a-form-item v-if="!testLog" label="Nom">
          <a-input v-model:value="formState.user.username" />
        </a-form-item>
        <a-form-item label="Email">
          <a-input v-model:value="formState.user.email" />
        </a-form-item>

        <a-form-item label="Mot de passe">
          <a-input-password v-model:value="formState.user.password" />
        </a-form-item>
      </a-form>

      <div class="flex justify-between">
        <a-button type="link" class="p-0" @click="changeForm">
          {{ testLog ? "Pas de compte ?" : "Déjà un compte ?" }}
          <span class="underline ml-1">{{
            testLog ? "S'inscrire" : "Se connecter"
          }}</span>
        </a-button>
        <div class="flex gap-3">
          <a-button @click="open = false">Retour</a-button>
          <a-button
            type="primary"
            :loading="loading"
            @click="testLog ? handleLogin() : handleRegister()"
          >
            {{ testLog ? "Se connecter" : "Confirmez" }}
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { User } from "lucide-vue-next";
import { login, register } from "@/api";
import { useUserStore } from "@/stores/userStores";
import { useToast } from "vue-toastification";
import { useArticlesStore } from "@/stores/articleStore";
import ButtonNav from "../ButtonNav.vue";

const open = ref<boolean>(false);
const testLog = ref<boolean>(true);
const loading = ref(false);
const formState = reactive({
  user: { username: "", email: "", password: "" },
});
const toast = useToast();
const userStore = useUserStore();
const articlesStore = useArticlesStore();

const changeForm = () => {
  testLog.value = !testLog.value;
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
    open.value = false;
    toast.success(message);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    loading.value = false;
  }
};
</script>
