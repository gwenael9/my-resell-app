<template>
  <BreadCrumb :crumbs="[{ label: 'Articles' }]" />
  <LoadingComp v-if="loading" />
  <div v-if="!loading">
    <div class="flex sm:items-center justify-between gap-2">
      <h2 class="text-xl font-semibold m-0 hidden sm:flex">
        Articles disponibles : {{ articlesStore.articles.length }}
      </h2>
      <div class="flex gap-2">
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

    <p v-else class="mt-4">
      <a-empty description="Aucun article de disponible." />
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import CardArticle from "@/components/Article/CardArticle.vue";
import { onMounted, ref } from "vue";
import SearchBar from "@/components/ui/SearchBar.vue";
import debounce from "lodash.debounce";
import ModalCategorie from "@/components/ui/ModalCategorie.vue";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import ButtonNav from "@/components/Buttons/ButtonNav.vue";
import { X } from "lucide-vue-next";

const articlesStore = useArticlesStore();
const value = ref<string>("");
const loading = ref<boolean>(true);
const selectedCategories = ref<string[]>([]);

const fetchArticlesDebounced = debounce(
  async (searchValue = "", categorieId: string[] = []) => {
    loading.value = true; // Affiche le loader pendant le fetch
    try {
      if (searchValue || categorieId.length > 0) {
        await articlesStore.fetchArticles(searchValue, categorieId);
      } else {
        await articlesStore.fetchArticles();
      }
    } catch (error) {
      console.error("Erreur lors du chargement des articles.", error);
    } finally {
      loading.value = false; // Masque le loader après le fetch
    }
  },
  600 // Délai du debounce en millisecondes
);

const deleteFiltres = () => {
  loading.value = true;
  value.value = "";
  selectedCategories.value = [];
  fetchArticlesDebounced();
  loading.value = false;
};

const onSearch = async () => {
  fetchArticlesDebounced(value.value, selectedCategories.value);
};

const onCategorieSelected = (categorieId: string[]) => {
  selectedCategories.value = categorieId;
  fetchArticlesDebounced(value.value, categorieId);
};

// Chargement initial des articles
onMounted(() => {
  fetchArticlesDebounced();
});
</script>
