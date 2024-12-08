<template>
  <div>
    <ButtonText
      v-if="isAdd && text"
      :icon="Plus"
      @click="open = true"
      :text="text"
    />
    <ButtonNav v-else-if="isAdd" :icon="Plus" @click="open = true" />
    <ButtonText
      v-else
      :icon="Pen"
      type="primary"
      text="Modifier l'article"
      class="hidden sm:flex"
      @click="open = true"
    />
    <a-modal v-model:open="open" :footer="null" width="720px">
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

      <a-form
        :model="formState"
        @finish="isAdd ? handleFormSubmit() : handleUpdateSubmit()"
        layout="vertical"
        :rules="rules"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Titre" name="title">
              <a-input
                v-model:value="formState.title"
                placeholder="Titre de l'article"
              />
            </a-form-item>

            <a-form-item label="Prix (€)" name="price">
              <a-input-number
                v-model:value="formState.price"
                placeholder="10"
                :min="0"
                style="width: 100%"
              />
            </a-form-item>

            <a-form-item label="Taille" name="size">
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

            <a-form-item label="État" name="etat">
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
            <a-form-item label="Description" name="description">
              <a-textarea
                v-model:value="formState.description"
                placeholder="Description de l'article"
                :auto-size="{ minRows: 2, maxRows: 4 }"
              />
            </a-form-item>

            <a-form-item label="Catégorie" name="category">
              <a-select
                v-model:value="formState.categorieId"
                placeholder="Sélectionnez une catégorie"
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

            <a-form-item label="Image" name="image">
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
import { ref, reactive, onMounted, PropType } from "vue";
import { Plus, Pen } from "lucide-vue-next";
import ButtonNav from "../Buttons/ButtonNav.vue";
import { defineProps } from "vue";
import { addNewArticle, updateArticle } from "@/api";
import { useRouter } from "vue-router";
import { useCategoriesStore } from "@/stores/categorieStore";
import { Article } from "@/types";
import ButtonText from "../Buttons/ButtonText.vue";
import { useArticlesStore } from "@/stores/articleStore";
import { notification } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form";

const articlesStore = useArticlesStore();
const router = useRouter();

const props = defineProps({
  isAdd: { type: Boolean, required: true },
  text: { type: String, required: false },
  data: { type: Object as PropType<Article>, required: false },
});

// ouverture de la modal
const open = ref<boolean>(false);
const categoriesStore = useCategoriesStore();
const loading = ref(false);
const formState = reactive({
  title: props.data?.title,
  description: props.data?.description,
  size: props.data?.size,
  price: props.data?.price,
  etat: props.data?.etat,
  categorieId: props.data?.categorie.id,
  image: props.data?.image,
});

const rules: Record<string, Rule[]> = {
  title: [
    {
      required: true,
      message: "Vous devez définir un titre pour l'article.",
    },
    {
      min: 3,
      max: 20,
      message: "Le titre de l'article doit être entre 3 et 20 caractères",
    },
  ],
  price: [
    {
      required: true,
      message: "Vous devez définir un prix pour l'article.",
    },
  ],
  size: [
    {
      required: true,
      message: "Vous devez définir une taile pour l'article.",
    },
  ],
  etat: [
    {
      required: true,
      message: "Vous devez définir un état pour l'article.",
    },
  ],
  description: [
    {
      required: true,
      message: "Vous devez définir une description pour l'article.",
    },
  ],
  // category: [
  //   {
  //     required: true,
  //     message: "Vous devez définir une catégorie pour l'article.",
  //   },
  // ],
  image: [
    {
      required: true,
      message: "Vous devez définir une image pour l'article.",
    },
  ],
};

const error = ref<string | null>(null);

const images = ["jean", "pull", "sac", "t-shirt", "manteau"];

const etats = [
  "Neuf avec étiquette",
  "Neuf sans étiquette",
  "Très bon état",
  "Bon état",
  "Satisfaisant",
];

const sizes = ["XS", "S", "M", "L", "XL", "TU"];

const handleFormSubmit = async () => {
  loading.value = true;
  try {
    const { message, id } = await addNewArticle(
      formState.title || "",
      formState.description || "",
      formState.size || "",
      formState.price || 0,
      formState.etat || "",
      formState.categorieId || 0,
      formState.image || "default"
    );
    open.value = false;
    notification.success({
      message,
    });
    await articlesStore.fetchOneArticle(id);
    formState.title = "";
    formState.description = "";
    formState.size = "";
    formState.price = undefined;
    formState.etat = "";
    formState.categorieId = undefined;
    formState.image = "";
    router.push(`/articles/${id}`);
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

const handleUpdateSubmit = async () => {
  loading.value = true;
  try {
    const idArticle = props.data?.id || 0;
    const updatedFormState = {
      title: formState.title || "",
      description: formState.description || "",
      size: formState.size || "",
      price: formState.price || 0,
      etat: formState.etat || "",
      categorieId: formState.categorieId || 0,
      image: formState.image || "default",
    };

    const message = await updateArticle(idArticle, updatedFormState);
    notification.success({
      message,
    });
    await articlesStore.fetchOneArticle(idArticle);
    open.value = false;
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  error.value = null;
  categoriesStore.fetchCategories();
});
</script>
