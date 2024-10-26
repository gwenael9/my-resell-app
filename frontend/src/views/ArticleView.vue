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
import { onMounted, watch } from "vue";
import CardArticle from "@/components/CardArticle.vue";
import { useArticlesStore } from "@/stores/articleStore";

export default {
  name: "ArticlesList",
  components: {
    CardArticle,
  },
  setup() {
    const articlesStore = useArticlesStore();

    onMounted(() => {
      articlesStore.fetchArticles();
    });

    watch(
      () => articlesStore.articles,
      (newArticles) => {
        console.log("Articles mis à jour :", newArticles);
      },
      { deep: true, immediate: true }
    );

    return {
      articles: articlesStore.articles,
    };
  },
};
</script>
