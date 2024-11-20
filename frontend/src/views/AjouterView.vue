<template>
  <div class="mx-auto mt-6 p-4 sm:px-16 max-w-4xl">
    <h1 class="text-center font-bold text-2xl mb-4">Ajouter un article</h1>

    <a-form :model="formState" layout="vertical" @finish="handleAddArticle">
      <!-- Title -->
      <a-form-item label="Titre" required>
        <a-input
          v-model:value="formState.title"
          placeholder="Titre de l'article"
        />
      </a-form-item>

      <!-- Description -->
      <a-form-item label="Description" required>
        <a-textarea
          v-model:value="formState.description"
          placeholder="Description de l'article"
        />
      </a-form-item>

      <!-- Size -->
      <a-form-item label="Taille" required>
        <a-input
          v-model:value="formState.size"
          placeholder="Taille de l'article"
        />
      </a-form-item>

      <!-- Price -->
      <a-form-item label="Prix (€)" required>
        <a-input-number
          v-model:value="formState.price"
          :min="0"
          style="width: 100%"
        />
      </a-form-item>

      <!-- Etat -->
      <a-form-item label="État" required>
        <a-select
          v-model:value="formState.etat"
          placeholder="Sélectionnez un état"
        >
          <a-select-option v-for="etat in etats" :key="etat" :value="etat">
            {{ etat }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <!-- Category ID -->
      <a-form-item label="Catégorie" required>
        <a-select
          v-model="formState.categorieId"
          placeholder="Sélectionnez la catégorie"
        >
          <a-select-option
            v-for="categorie in categories"
            :key="categorie.id"
            :value="categorie.id"
          >
            {{ categorie.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Choisissez une image" required>
        <a-radio-group v-model="formState.image">
          <a-radio-button v-for="image in images" :key="image" :value="image">
            <img
              :src="`/img/${image}`"
              :alt="image"
              class="w-16 h-16 object-cover"
            />
          </a-radio-button>
        </a-radio-group>
      </a-form-item>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <a-button type="primary" :loading="loading" @click="handleAddArticle">
          Ajouter l'article
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { addNewArticle } from "@/api";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { getCategories } from "@/api/categorie";
import { Categorie } from "@/types";

const toast = useToast();
const router = useRouter();
const loading = ref(false);

const categories = ref<Categorie[]>([]);

const images = ["jean.png", "pull.png", "sac.png", "t-shirt.png"];

const etats = [
  "Neuf avec étiquette",
  "Neuf sans étiquette",
  "Très bon état",
  "Bon état",
  "Satisfaisant",
];

// Form state for adding a new article
const formState = reactive({
  title: "",
  description: "",
  size: "",
  price: 0,
  etat: "",
  categorieId: 0,
  image: "",
});

// recuperer les articles
onMounted(async () => {
  try {
    categories.value = await getCategories();
  } catch (error) {
    toast.error("Erreur lors du chargement des catégories");
  }
});

// Handle adding the new article
const handleAddArticle = async () => {
  loading.value = true;
  try {
    const { message, id } = await addNewArticle(
      formState.title,
      formState.description,
      formState.size,
      formState.price,
      formState.etat,
      formState.categorieId,
      formState.image
    );
    toast.success(message);
    router.push(`/articles/${id}`);
  } catch (error) {
    toast.error((error as Error).message);
  } finally {
    loading.value = false;
  }
};
</script>
