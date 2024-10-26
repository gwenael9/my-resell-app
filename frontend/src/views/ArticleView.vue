<template>
  <div>
    <div v-if="articles.length" class="flex justify-center gap-4">
      <CardArticle
        v-for="article in articles"
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
      articles: articlesStore.articles,
    };
  },
};
</script>
