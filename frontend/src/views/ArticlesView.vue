<template>
  <div class="mx-8 my-4">
    <p v-if="!articlesStore.articles.length">
      Aucun article disponible pour le moment.
    </p>
    <div class="flex justify-center flex-wrap gap-6">
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
const articlesStore = useArticlesStore();
</script>
