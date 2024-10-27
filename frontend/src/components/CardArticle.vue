<template>
  <a-card class="w-[200px]">
    <template #cover>
      <img
        alt="image ramdom"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    </template>
    <h2>{{ article.title }}</h2>
    <div class="flex justify-between">
      <p>{{ article.size }}</p>
      <p>{{ article.price }} €</p>
    </div>
    <div class="flex justify-between">
      <a-button
        type="text"
        class="flex items-center gap-1"
        :class="!userStore.isAuthenticated && 'cursor-default'"
        @click="handleChangeLike"
      >
        {{ article.likesCount
        }}<Heart size="14" :class="isLiked ? 'text-red-500' : 'text-gray-500'"
      /></a-button>
      <a-button type="primary">Voir</a-button>
    </div>
  </a-card>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Article } from "@/types";
import { Heart } from "lucide-vue-next";
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";

export default defineComponent({
  name: "CardArticle",
  components: {
    Heart,
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
