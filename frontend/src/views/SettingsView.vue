<template>
  <BreadCrumb
    :crumbs="[{ label: 'Mon compte', to: '/compte' }, { label: 'Paramètres' }]"
  />
  <h2 class="text-xl font-semibold mb-4 text-left max-w-4xl w-full">
    Modifier votre profil
  </h2>
  <div class="flex flex-col items-center">
    <div class="max-w-[800px]">
      <a-alert v-if="error" :message="error" type="error" show-icon />
      <a-form
        :model="formState"
        @finish="handleFormSubmit"
        class="mt-4"
        :rules="rules"
        layout="vertical"
        ref="formRef"
      >
        <a-form-item name="username" label="Nom">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="Avatar">
          <div class="flex justify-center gap-2 flex-wrap">
            <div
              class="border-2 rounded-xl cursor-pointer overflow-hidden"
              v-for="image in avatars"
              :key="image"
              @click="formState.avatar = image"
              :class="{
                'border-primary': formState.avatar === image,
              }"
            >
              <img
                :src="`/img/avatars/${image}.jpg`"
                :alt="`image ${image}`"
                class="w-28 object-cover"
              />
            </div>
          </div>
        </a-form-item>

        <a-form-item name="passwords" label="Mot de passe">
          <div class="flex gap-4">
            <a-form-item
              name="currentPassword"
              class="w-full"
              :rules="rules.currentPassword"
            >
              <a-input-password
                v-model:value="formState.currentPassword"
                placeholder="Mot de passe actuel"
                type="password"
              />
            </a-form-item>

            <a-form-item
              name="newPassword"
              class="w-full"
              :rules="rules.newPassword"
            >
              <a-input-password
                v-model:value="formState.newPassword"
                placeholder="Nouveau mot de passe"
              />
            </a-form-item>
          </div>
        </a-form-item>
        <a-form-item class="flex justify-end">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            :disabled="!hasChanges"
          >
            Confirmez les modifications
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { useUserStore } from "@/stores/userStores";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { updateAvatar, updatePassword, updateUsername } from "@/api";
import { Rule } from "ant-design-vue/es/form";
import { regexPassword, avatars } from "@/utils";
import { notification } from "ant-design-vue";

const userStore = useUserStore();
const loading = ref(false);
const formState = reactive({
  username: userStore.user?.username,
  avatar: userStore.user?.avatar,
  currentPassword: "",
  newPassword: "",
});

const error = ref<string | null>(null);
const router = useRouter();

// Vérifie si des modifications ont été effectuées
const hasChanges = computed(() => {
  return (
    (formState.username !== "" &&
      formState.username !== userStore.user?.username) ||
    formState.avatar !== userStore.user?.avatar ||
    (formState.currentPassword && formState.newPassword)
  );
});

// Règles de validation
const rules: Record<string, Rule[]> = {
  username: [
    {
      min: 3,
      message: "Le nom d'utilisateur doit avoir au moins 3 caractères",
      trigger: "blur",
    },
  ],
  currentPassword: [
    {
      validator: async (_, value) => {
        if (!value) return Promise.resolve();
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
  newPassword: [
    {
      validator: (_, value) => {
        if (!value && !formState.currentPassword) return Promise.resolve();
        if (!regexPassword.test(value)) {
          return Promise.reject(
            new Error(
              "Le mot de passe doit contenir au moins 8 caractères avec une lettre majuscule, minuscule, un chiffre et un caractère spécial."
            )
          );
        }
        if (value === formState.currentPassword) {
          return Promise.reject(
            new Error(
              "Le nouveau mot de passe doit être différent du mot de passe actuel"
            )
          );
        }
        return Promise.resolve();
      },
      trigger: "blur",
    },
  ],
};

const handleFormSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    if (formState.username && formState.username !== userStore.user?.username) {
      await updateUsername(formState.username);
    }

    if (formState.avatar && formState.avatar !== userStore.user?.avatar) {
      await updateAvatar(formState.avatar);
    }

    if (formState.currentPassword && formState.newPassword) {
      await updatePassword(formState.currentPassword, formState.newPassword);
    }
    notification.success({
      message: "Les modifications ont bien été prises en compte !",
    });
    router.push("/compte");
  } catch (err) {
    console.error("Erreur lors des modifications du profiles", err);
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>
