<template>
  <BreadCrumb
    :crumbs="[{ label: 'Articles', to: '/articles' }, { label: 'Favoris' }]"
  />
  <div v-if="articlesStore.articlesLikes.length > 0">
    <h2 class="text-xl font-semibold">
      Articles favoris : {{ articlesStore.articlesLikes.length }}
    </h2>

    <div
      v-if="articlesStore.articles.length > 0"
      class="flex justify-center flex-wrap gap-6 mt-8"
    >
      <CardArticle
        v-for="article in articlesStore.articlesLikes"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
  <NoArticles v-else type="favoris" />
</template>

<script setup>
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { useArticlesStore } from "@/stores/articleStore";
import CardArticle from "@/components/Article/CardArticle.vue";
import NoArticles from "@/components/ui/NoArticles.vue";

const articlesStore = useArticlesStore();
</script>
