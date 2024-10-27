<template>
  <div>
    <div
      v-if="articlesStore.articles.length"
      class="flex justify-center flex-wrap gap-6"
    >
      <CardArticle
        v-for="article in articlesStore.articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <p v-else>Aucun article disponible pour le moment.</p>
  </div>
</template>
<script lang="ts">
import CardArticle from "@/components/CardArticle.vue";
import { useArticlesStore } from "@/stores/articleStore";

export default {
  name: "ArticlesList",
  components: {
    CardArticle,
  },
  setup() {
    const articlesStore = useArticlesStore();

    return {
      articlesStore,
    };
  },
};
</script>
