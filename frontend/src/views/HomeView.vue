<template>
  <HomeBanner />
  <hr />
  <LoadingComp v-if="loading" />
  <div v-else>
    <p class="text-center" v-if="!articlesStore.articles.length">
      Aucun article disponible pour le moment.
    </p>
    <CarouselArticle type="all" :articles="articlesStore.articles" />
    <CarouselArticle
      v-if="articlesStore.articlesLikes.length > 0"
      type="like"
      :articles="articlesStore.articlesLikes"
    />
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import CarouselArticle from "@/components/Article/CarouselArticle.vue";
import { onMounted, ref } from "vue";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import HomeBanner from "@/components/Layout/HomeBanner.vue";
const articlesStore = useArticlesStore();

const loading = ref<boolean>(true);

onMounted(async () => {
  await articlesStore.fetchArticles();
  loading.value = false;
});
</script>
