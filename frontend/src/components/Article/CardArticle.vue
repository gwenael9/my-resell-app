<template>
  <div class="w-[250px] flex-shrink-0 relative">
    <router-link :to="'/articles/' + article.id">
      <img
        class="rounded-xl bg-gray-100"
        alt="image de l'article"
        :src="`/img/${article.imageAlt}.png`"
      />
    </router-link>
    <div class="absolute top-2 right-2">
      <a-button
        shape="circle"
        class="flex justify-center items-center gap-0.5 font-medium"
        @click.stop="() => articlesStore.toggleLike(article.id)"
      >
        {{ article.likesCount }}
        <Heart :size="14" :class="isLiked ? 'text-red-500' : 'text-gray-500'"
      /></a-button>
    </div>
    <div class="flex flex-col gap-2 p-3">
      <div class="flex justify-between">
        <h2 class="font-semibold">
          {{ article.title }}
          <span class="font-normal">({{ article.size }})</span>
        </h2>
        <span class="font-bold">€ {{ article.price }}</span>
      </div>
      <div v-if="!isMyArticle" class="text-gray-500 text-xs">
        {{ truncateDescription(article.description) }}
      </div>
      <div v-if="!isMyArticle" class="flex justify-end">
        <a-button
          ghost
          type="primary"
          shape="round"
          @click="panierStore.handleAddOrDeleteToPanier(article.id)"
        >
          <template v-if="panierStore.isInPanier(article.id)">
            <Check />
          </template>
          <template v-else>
            <div class="flex items-center gap-1">
              Ajouter au panier <ShoppingBag :size="14" />
            </div>
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue";
import { Article } from "@/types";
import { Heart, ShoppingBag, Check } from "lucide-vue-next";
import { useArticlesStore } from "@/stores/articleStore";
import { usePanierStore } from "@/stores/panierStore";
import { useUserStore } from "@/stores/userStores";

const props = defineProps({
  article: { type: Object as PropType<Article>, required: true },
});
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();
const userStore = useUserStore();

console.log(userStore.user?.id);
console.log(props.article.user.id);

const isMyArticle = computed(() => {
  return userStore.user?.id === props.article.user.id;
});

// vérifiez si l'article est liké par l'utilisateur actuel
const isLiked = computed(() => articlesStore.isLiked(props.article.id));

const truncateDescription = (description: string) => {
  if (description.length > 39) {
    return description.slice(0, 39) + "...";
  }
  return description;
};
</script>
