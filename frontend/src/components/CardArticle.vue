<template>
  <div class="w-[300px]">
    <div class="relative">
      <img
        class="rounded-xl"
        alt="image ramdom"
        src="https://picsum.photos/300/300"
      />
      <div class="absolute top-2 right-2">
        <a-button
          shape="circle"
          class="flex justify-center items-center gap-0.5 font-medium"
          :class="!userStore.isAuthenticated && 'cursor-default'"
          @click="handleChangeLike"
        >
          {{ article.likesCount }}
          <Heart :size="14" :class="isLiked ? 'text-red-500' : 'text-gray-500'"
        /></a-button>
      </div>
    </div>
    <div class="flex flex-col gap-2 p-3">
      <div class="flex justify-between">
        <h2 class="font-semibold">{{ article.title }}</h2>
        <span class="font-bold">€ {{ article.price }}</span>
      </div>
      <div class="text-gray-500 text-xs">{{ article.description }}</div>
      <div class="flex justify-end">
        <a-button
          ghost
          type="primary"
          shape="round"
          class="flex items-center gap-1"
        >
          Ajouter au panier
          <ShoppingBag :size="14" />
        </a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Article } from "@/types";
import { Heart, ShoppingBag } from "lucide-vue-next";
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";

export default defineComponent({
  name: "CardArticle",
  components: {
    Heart,
    ShoppingBag,
  },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(props) {
    const articlesStore = useArticlesStore();
    const userStore = useUserStore();

    // vérifiez si l'article est liké par l'utilisateur actuel
    const isLiked = computed(() => {
      return articlesStore.articlesLikes.some(
        (like) => like.id === props.article.id
      );
    });

    // gérer le like/unlike
    const handleChangeLike = async () => {
      try {
        if (isLiked.value) {
          await articlesStore.unlikeArticle(props.article.id);
        } else {
          await articlesStore.likeArticle(props.article.id);
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout ou suppression du like:", error);
      }
    };

    return {
      handleChangeLike,
      isLiked,
      userStore,
    };
  },
});
</script>
