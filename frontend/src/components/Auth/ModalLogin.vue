<template>
  <div>
    <a-button
      size="large"
      shape="circle"
      class="flex justify-center items-center"
      @click="open = true"
    >
      <User :size="18" />
    </a-button>

    <a-modal v-model:open="open">
      <h2 class="text-2xl">Se connecter</h2>
      <p class="text-gray-400">
        Veuillez renseigner vos informations de connexion.
      </p>

      <a-form :model="formState" name="form-test" @finish="handleLogin">
        <a-form-item label="Email">
          <a-input v-model:value="formState.user.email" />
        </a-form-item>

        <a-form-item label="Mot de passe">
          <a-input-password v-model:value="formState.user.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-form>

      <template #footer>
        <a-button @click="open = false">Retour</a-button>
        <a-button type="primary" :loading="loading" @click="handleLogin">
          Se connecter
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { User } from "lucide-vue-next";
import { login } from "@/api";
import { useUserStore } from "@/stores/userStores";
import { useToast } from "vue-toastification";
import { useArticlesStore } from "@/stores/articleStore";
import { useRouter } from "vue-router";

const open = ref(false);
const loading = ref(false);
const formState = reactive({ user: { email: "", password: "" } });
const router = useRouter();
const toast = useToast();
const userStore = useUserStore();
const articlesStore = useArticlesStore();

const handleLogin = async () => {
  loading.value = true;
  try {
    const message = await login(formState.user.email, formState.user.password);
    await userStore.fetchUser();

    // refetch les articles
    await articlesStore.fetchArticles();
    open.value = false;
    router.push("/account");
    toast.success(message);
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
  } finally {
    loading.value = false;
  }
};
</script>
