<template>
  <div class="w-[250px] flex-shrink-0 relative">
    <router-link :to="{ name: 'article', params: { id: article.id } }">
      <img
        class="rounded-xl bg-gray-100 object-cover h-[250px]"
        alt="image de l'article"
        :src="`/img/${article.image}.png`"
      />
    </router-link>
    <div
      v-if="!isMyArticle"
      class="absolute top-2 right-2 flex flex-col gap-2 font-medium"
    >
      <ButtonNav
        :icon="Heart"
        @click="() => articlesStore.toggleLike(article.id)"
        :red="isLiked"
        size="medium"
        :text="article.likesCount"
      />
      <ButtonNav
        :icon="panierStore.isInPanier(props.article.id) ? Check : ShoppingBag"
        @click="() => panierStore.handleAddOrDeleteToPanier(article.id)"
        size="medium"
      />
    </div>
    <div class="flex flex-col gap-2 p-3">
      <div class="flex justify-between">
        <h2 class="font-semibold">
          {{ article.title }}
          <span class="font-normal">({{ article.size }})</span>
        </h2>
        <span class="font-bold">€ {{ article.price }}</span>
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
import ButtonNav from "../Buttons/ButtonNav.vue";

const props = defineProps({
  article: { type: Object as PropType<Article>, required: true },
});
const articlesStore = useArticlesStore();
const panierStore = usePanierStore();
const userStore = useUserStore();

const isMyArticle = computed(() => {
  return (
    props.article?.user?.id && userStore.user?.id === props.article.user.id
  );
});

// vérifiez si l'article est liké par l'utilisateur actuel
const isLiked = computed(() => articlesStore.isLiked(props.article.id));
</script>
