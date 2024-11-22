<template>
  <div class="flex justify-between bg-gray-100 p-8">
    <div class="flex flex-col items-baseline w-1/2">
      <h1 class="font-bold text-3xl">Bienvenue sur my-resell-app</h1>
      <span class="text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla nemo
        reiciendis quae neque eos blanditiis quam, id quibusdam quidem.
      </span>
    </div>
    <div
      class="flex flex-col sm:flex-row justify-end sm:justify-normal sm:items-end gap-2"
    >
      <a-button v-if="usersStore.isAuthenticated" shape="round">
        Ajouter un article
      </a-button>
      <a-button shape="round" type="primary"> Voir les articles </a-button>
    </div>
  </div>
  <div class="m-8">
    <p class="text-center" v-if="!articlesStore.articles.length">
      Aucun article disponible pour le moment.
    </p>
    <CarouselArticle title="disponibles" :articles="articlesStore.articles" />
    <CarouselArticle
      v-if="articlesStore.articlesLikes.length > 0"
      title="likés"
      :articles="articlesStore.articlesLikes"
    />
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import CarouselArticle from "@/components/Article/CarouselArticle.vue";
import { useUserStore } from "@/stores/userStores";
import { onMounted } from "vue";
const articlesStore = useArticlesStore();
const usersStore = useUserStore();

onMounted(() => {
  articlesStore.fetchArticles();
});
</script>
