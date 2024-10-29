<template>
  <div class="mx-8">
    <div v-if="article" class="flex flex-col sm:flex-row gap-4">
      <div class="sm:w-1/2">
        <img
          class="rounded-xl bg-gray-100 w-full"
          alt="image de l'article"
          :src="`/img/${article.imageAlt}.png`"
        />
      </div>
      <div>
        <div class="flex justify-between items-center">
          <h2 class="text-xl">{{ article.title }}</h2>
          <a-button
            shape="circle"
            class="flex justify-center items-center gap-0.5 font-medium"
            @click.stop="() => articlesStore.toggleLike(articleId)"
          >
            {{ article.likesCount }}
            <Heart
              :size="14"
              :class="isLiked ? 'text-red-500' : 'text-gray-500'"
          /></a-button>
        </div>
        <p class="text-gray-500">{{ article.description }}</p>
        <div>
          <p>{{ article.user.username }}</p>
        </div>
      </div>
    </div>
    <p v-else>Aucun article</p>
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Heart } from "lucide-vue-next";

const route = useRoute();
const articleId = Number(route.params.id);

const articlesStore = useArticlesStore();
const article = computed(() => articlesStore.article);

// vérifiez si l'article est liké par l'utilisateur actuel
const isLiked = computed(() => articlesStore.isLiked(articleId));

onMounted(async () => {
  await articlesStore.fetchOneArticle(articleId);
});
</script>
