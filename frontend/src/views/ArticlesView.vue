<template>
  <BreadCrumb :crumbs="[{ label: 'Articles' }]" />
  <LoadingComp v-if="loading" />
  <div v-if="!loading">
    <div class="flex sm:items-center justify-between gap-2">
      <h2 class="text-xl font-semibold m-0 hidden sm:flex sm:w-full">
        Articles disponibles : {{ articlesStore.articles.length }}
      </h2>
      <div class="flex gap-2 w-full sm:justify-end">
        <ButtonNav
          v-if="value || selectedCategories.length > 0"
          :icon="X"
          danger
          @click="deleteFiltres"
        />
        <SearchBar v-model="value" @search="onSearch" />
        <ModalCategorie
          :initialCategories="selectedCategories"
          @selectCategorie="onCategorieSelected"
        />
      </div>
    </div>

    <div class="flex flex-wrap gap-2 my-4">
      <ButtonText
        :key="categorie.id"
        v-for="categorie in selectedCategories"
        :text="categorie.name"
        :icon="XIcon"
        @click="deleteFilterCategorie(categorie)"
      />
    </div>

    <div
      v-if="articlesStore.articles.length > 0"
      class="flex justify-center flex-wrap gap-6 mt-8"
    >
      <CardArticle
        v-for="article in articlesStore.articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <NoArticles v-else />
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import CardArticle from "@/components/Article/CardArticle.vue";
import { onMounted, ref } from "vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import ModalCategorie from "@/components/ui/ModalCategorie.vue";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import ButtonNav from "@/components/Buttons/ButtonNav.vue";
import { X, XIcon } from "lucide-vue-next";
import { Categorie } from "@/types";
import ButtonText from "@/components/Buttons/ButtonText.vue";
import NoArticles from "@/components/ui/NoArticles.vue";

const articlesStore = useArticlesStore();
const value = ref<string>("");
const loading = ref<boolean>(true);
const selectedCategories = ref<Categorie[]>([]);

const fetchArticles = async (searchValue = "", categorie: Categorie[] = []) => {
  loading.value = true;
  setTimeout(async () => {
    let categorieId: string[] = [];
    categorie.map((cat) => categorieId.push(cat.id as unknown as string));
    try {
      if (searchValue || categorie.length > 0) {
        await articlesStore.fetchArticles(searchValue, categorieId);
      } else {
        await articlesStore.fetchArticles();
      }
    } catch (error) {
      console.error("Erreur lors du chargement des articles.", error);
    } finally {
      loading.value = false;
    }
  }, 600);
};

const deleteFiltres = async () => {
  value.value = "";
  selectedCategories.value = [];
  await fetchArticles();
};

const onSearch = async (searchValue: string) => {
  value.value = searchValue;
  fetchArticles(searchValue, selectedCategories.value);
};

const onCategorieSelected = (categorie: Categorie[]) => {
  selectedCategories.value = categorie;
  fetchArticles(value.value, categorie);
};

const deleteFilterCategorie = (categorie: Categorie) => {
  const index = selectedCategories.value.indexOf(categorie);
  selectedCategories.value.splice(index, 1);
  fetchArticles(value.value, selectedCategories.value);
};

// Chargement initial des articles
onMounted(() => {
  fetchArticles();
});
</script>
