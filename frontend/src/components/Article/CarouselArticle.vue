<template>
  <div class="flex justify-between items-center my-4">
    <div class="flex">
      <button @click="scrollLeft">
        <ChevronLeft />
      </button>
      <h2 class="m-0 text-lg">Articles {{ title }} ({{ articles.length }})</h2>
      <button @click="scrollRight">
        <ChevronRight />
      </button>
    </div>
    <div>
      <a-button type="link">
        <router-link to="/articles">Voir tout</router-link>
      </a-button>
    </div>
  </div>

  <div ref="carouselContainer" class="overflow-hidden w-full">
    <div
      class="flex gap-6 min-w-max"
      :style="{ width: `${articles.length * 250}px` }"
    >
      <CardArticle
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types";
import { defineComponent, PropType, ref } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import CardArticle from "./CardArticle.vue";

export default defineComponent({
  name: "CarouselArticle",
  components: {
    CardArticle,
    ChevronLeft,
    ChevronRight,
  },
  props: {
    articles: {
      type: Object as PropType<Article[]>,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup() {
    const carouselContainer = ref<HTMLElement | null>(null);

    const scrollAmount = 250;

    const scrollRight = () => {
      if (carouselContainer.value) {
        carouselContainer.value.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    const scrollLeft = () => {
      if (carouselContainer.value) {
        carouselContainer.value.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return {
      scrollLeft,
      scrollRight,
      carouselContainer,
    };
  },
});
</script>
