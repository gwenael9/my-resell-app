<template>
  <div>
    <ButtonNav :icon="Plus" @click="open = true" />
    <a-modal
      v-model:open="open"
      :footer="null"
      width="720px"
      class="compact-modal"
    >
      <h2 class="text-2xl mb-2">
        {{ isAdd ? "Ajouter un" : "Modifier votre" }} article
      </h2>
      <p class="text-gray-500 mb-6">
        Veuillez renseigner les {{ !isAdd ? "nouvelles" : "" }} informations de
        l'article.
      </p>

      <a-alert
        v-if="error"
        :message="error"
        type="error"
        show-icon
        class="mb-4"
      />

      <a-form :model="formState" @finish="handleFormSubmit" layout="vertical">
        <a-row gutter="16">
          <a-col :span="12">
            <a-form-item label="Titre" required>
              <a-input
                v-model:value="formState.title"
                placeholder="Titre de l'article"
              />
            </a-form-item>

            <a-form-item label="Prix (€)" required>
              <a-input-number
                v-model:value="formState.price"
                :min="0"
                style="width: 100%"
              />
            </a-form-item>

            <a-form-item label="Taille" required>
              <a-select
                v-model:value="formState.size"
                placeholder="Sélectionnez la taille"
              >
                <a-select-option
                  v-for="size in sizes"
                  :key="size"
                  :value="size"
                >
                  {{ size }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="État" required>
              <a-select
                v-model:value="formState.etat"
                placeholder="Sélectionnez un état"
              >
                <a-select-option
                  v-for="etat in etats"
                  :key="etat"
                  :value="etat"
                >
                  {{ etat }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="Description" required>
              <a-textarea
                v-model:value="formState.description"
                placeholder="Description de l'article"
                :auto-size="{ minRows: 2, maxRows: 4 }"
              />
            </a-form-item>

            <a-form-item label="Catégorie" required>
              <a-select
                v-model:value="formState.categorieId"
                placeholder="Sélectionnez la catégorie"
              >
                <a-select-option
                  v-for="categorie in categoriesStore.categories"
                  :key="categorie.id"
                  :value="categorie.id"
                >
                  {{ categorie.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="Image" required>
              <div class="flex gap-2 flex-wrap">
                <div
                  class="border rounded-xl cursor-pointer"
                  v-for="image in images"
                  :key="image"
                  @click="formState.image = image"
                  :class="{
                    'border-2 border-primary': formState.image === image,
                    'border-2 border-gray-300': formState.image !== image,
                  }"
                >
                  <img
                    :src="`/img/${image}.png`"
                    :alt="`image ${image}`"
                    class="w-16 object-cover"
                  />
                </div>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- Boutons -->
        <a-form-item class="flex justify-end mt-6">
          <a-button class="mr-2" @click="open = false">Retour</a-button>
          <a-button type="primary" html-type="submit" :loading="loading">
            Confirmez
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { Plus } from "lucide-vue-next";
import ButtonNav from "../Buttons/ButtonNav.vue";
import { defineProps } from "vue";
import { useToast } from "vue-toastification";
import { addNewArticle } from "@/api";
import { useRouter } from "vue-router";
import { useCategoriesStore } from "@/stores/categorieStore";

defineProps({
  isAdd: { type: Boolean, required: true },
});

// ouverture de la modal
const open = ref<boolean>(false);
const loading = ref(false);
const formState = reactive({
  title: "",
  description: "",
  size: null,
  price: 0,
  etat: null,
  categorieId: null,
  image: "",
});

const error = ref<string | null>(null);

const categoriesStore = useCategoriesStore();

const images = ["jean", "pull", "sac", "t-shirt", "manteau"];

const etats = [
  "Neuf avec étiquette",
  "Neuf sans étiquette",
  "Très bon état",
  "Bon état",
  "Satisfaisant",
];

const sizes = ["XS", "S", "M", "L", "XL", "TU"];

const toast = useToast();
const router = useRouter();

const handleFormSubmit = async () => {
  loading.value = true;
  try {
    const { message, id } = await addNewArticle(
      formState.title,
      formState.description,
      formState.size || "",
      formState.price,
      formState.etat || "",
      formState.categorieId || 0,
      formState.image
    );
    open.value = false;
    toast.success(message);
    router.push(`/articles/${id}`);
  } catch (err) {
    // toast.error((err as Error).message);
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  categoriesStore.fetchCategories();
});
</script>
