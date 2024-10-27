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
          @click="handleLikeClick"
        >
          {{ article.likesCount }}
          <Heart :size="14" :class="isLiked ? 'text-red-500' : 'text-gray-500'"
        /></a-button>
      </div>
    </div>
    <div class="flex flex-col gap-2 p-3">
      <div class="flex justify-between">
        <h2 class="font-semibold">
          {{ article.title }}
          <span class="font-normal">({{ article.size }})</span>
        </h2>
        <span class="font-bold">€ {{ article.price }}</span>
      </div>
      <div class="text-gray-500 text-xs">{{ article.description }}</div>
      <div class="flex justify-end">
        <a-button ghost type="primary" shape="round" @click="handlePanierClick">
          <template v-if="isInPanier">
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
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { Article } from "@/types";
import { Heart, ShoppingBag, Check } from "lucide-vue-next";
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";
import { usePanierStore } from "@/stores/panierStore";

export default defineComponent({
  name: "CardArticle",
  components: {
    Heart,
    ShoppingBag,
    Check,
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
    const panierStore = usePanierStore();

    // vérifiez si l'article est liké par l'utilisateur actuel
    const isLiked = computed(() => {
      return articlesStore.articlesLikes.some(
        (like) => like.id === props.article.id
      );
    });

    // vérifie si l'article est dans le panier ou non
    const isInPanier = computed(() => {
      return panierStore.panier?.articles.some(
        (article) => article.id === props.article.id
      );
    });

    // ouvre la modal de connexion lorsqu'un user va vouloir faire une action impossible si pas connecté
    const openLoginModal = () => {
      document.dispatchEvent(new CustomEvent("open-login-modal"));
    };

    // gérer le like/unlike
    const handleLikeClick = async () => {
      if (!userStore.isAuthenticated) {
        openLoginModal();
        return;
      }
      isLiked.value
        ? await articlesStore.unlikeArticle(props.article.id)
        : await articlesStore.likeArticle(props.article.id);
    };

    // gere l'ajout dans le panier
    const handlePanierClick = async () => {
      if (!userStore.isAuthenticated) {
        openLoginModal();
        return;
      }
      if (!isInPanier.value) {
        await panierStore.addToPanier(props.article.id);
      }
    };

    return {
      handleLikeClick,
      handlePanierClick,
      isLiked,
      isInPanier,
    };
  },
});
</script>
