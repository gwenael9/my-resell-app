<template>
  <a-modal
    v-model:open="panierStore.isModalUpdateInfosLivraisonOpen"
    :footer="null"
  >
    <h2 class="text-2xl mb-2">Informations de livraisons</h2>
    <p class="text-gray-500 mb-6">
      Veuillez renseigner vos informations de livraisons.
    </p>

    <a-alert
      v-if="error"
      :message="error"
      type="error"
      show-icon
      class="mb-4"
    />

    <a-form :model="formState" @finish="handleFormSubmit()">
      <a-form-item label="Adresse" name="adresse">
        <a-input
          v-model:value="formState.adresse"
          placeholder="Votre adresse"
        />
      </a-form-item>

      <div class="flex gap-4">
        <a-form-item label="Ville" name="city">
          <a-input v-model:value="formState.city" placeholder="Ville" />
        </a-form-item>

        <a-form-item label="Code postal" name="code postal">
          <a-input v-model:value="formState.cp" placeholder="33000" />
        </a-form-item>
      </div>

      <div class="flex justify-end">
        <a-form-item>
          <a-button class="mr-2" @click="panierStore.closeLivraisonModal">
            Retour
          </a-button>
          <a-button type="primary" html-type="submit" :loading="loading">
            Confirmez
          </a-button>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType } from "vue";
import { defineProps } from "vue";
import { Livraison } from "@/types";
import { useUserStore } from "@/stores/userStores";
import { usePanierStore } from "@/stores/panierStore";

const userStore = useUserStore();
const panierStore = usePanierStore();

const props = defineProps({
  data: { type: Object as PropType<Livraison>, required: false },
});

const loading = ref(false);
const formState = reactive({
  city: props.data?.city || "",
  adresse: props.data?.adresse || "",
  cp: props.data?.cp || null,
});

const error = ref<string | null>(null);

const handleFormSubmit = async () => {
  if (!formState.city || !formState.adresse || !formState.cp) {
    error.value = "Tous les champs sont requis.";
    loading.value = false;
    return;
  }
  loading.value = true;
  try {
    const dataToSubmit = {
      ...formState,
      cp: formState.cp || 0,
    };
    await userStore.updateInfosLivraisonStore(dataToSubmit);
    panierStore.closeLivraisonModal();
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};
</script>
