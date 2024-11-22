<template>
  <div class="mx-8 my-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between">
      <h2 class="text-xl mb-2 sm:m-0">
        Articles disponibles ({{ articlesStore.articles.length }})
      </h2>
      <div class="flex gap-2">
        <div
          class="flex items-center border border-gray-300 rounded-full overflow-hidden w-full sm:max-w-[300px] py-2 px-4"
        >
          <input
            type="search"
            name="searchArticle"
            id="searchId"
            placeholder="Rechercher..."
            class="flex-1 focus:outline-none"
            v-model="value"
          />
          <button @click="onSearch">
            <component :is="Search" :size="18" />
          </button>
        </div>
        <ModalCategorie @selectCategorie="onCategorieSelected" />
      </div>
    </div>
    <p v-if="!articlesStore.articles.length">
      <a-empty description="Aucun article de disponible." />
    </p>
    <div v-else class="flex justify-center flex-wrap gap-6 mt-8">
      <CardArticle
        v-for="article in articlesStore.articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import CardArticle from "@/components/Article/CardArticle.vue";
import { ref, watch } from "vue";
import { Search } from "lucide-vue-next";
import debounce from "lodash.debounce";
import ModalCategorie from "@/components/ModalCategorie.vue";

const articlesStore = useArticlesStore();
const value = ref<string>("");

const fetchArticlesDebounced = debounce(
  async (searchValue: string, categorieId = []) => {
    if (searchValue.length > 0 || categorieId.length > 0) {
      await articlesStore.fetchArticles(searchValue, categorieId);
    } else if (searchValue.length === 0) {
      await articlesStore.fetchArticles();
    }
  },
  300
);

watch(value, (newValue) => {
  fetchArticlesDebounced(newValue);
});

const onSearch = async () => {
  fetchArticlesDebounced(value.value);
};

const onCategorieSelected = (categorieId: string[]) => {
  fetchArticlesDebounced(value.value, categorieId);
};
</script>
