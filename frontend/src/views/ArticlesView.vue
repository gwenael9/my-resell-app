<template>
  <div class="mx-8 my-4">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between">
      <h2 class="text-xl m-0">
        Articles disponibles ({{ articlesStore.articles.length }})
      </h2>
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
          @keyup.enter="onSearch(value)"
        />
        <button @click="onSearch(value)">
          <component :is="Search" :size="18" />
        </button>
      </div>
    </div>
    <p v-if="!articlesStore.articles.length">
      <a-empty description="Aucune article de disponible." />
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
import { ref } from "vue";
import { Search } from "lucide-vue-next";

const articlesStore = useArticlesStore();
const value = ref<string>("");

const onSearch = async (searchValue: string) => {
  console.log(searchValue);
  await articlesStore.fetchArticles(searchValue);
};
</script>
