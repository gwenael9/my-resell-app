<template>
  <div class="flex justify-between items-center my-4">
    <div class="flex items-center">
      <button @click="scrollLeft">
        <ChevronLeft />
      </button>
      <h2 class="m-0 sm:text-lg">
        Articles {{ title }} ({{ articles.length }})
      </h2>
      <button @click="scrollRight">
        <ChevronRight />
      </button>
    </div>
    <div class="hidden sm:block" v-if="props.type == 'all'">
      <a-button type="link">
        <router-link to="/articles">Voir tout</router-link>
      </a-button>
    </div>
  </div>

  <div ref="carouselContainer" class="overflow-hidden w-full">
    <div
      class="flex gap-6 min-w-max"
      :style="{ width: `${articles.length * 274}px` }"
    >
      <CardArticle
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Article } from "@/types";
import { defineProps, PropType, ref } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import CardArticle from "./CardArticle.vue";

const props = defineProps({
  articles: {
    type: Object as PropType<Article[]>,
    required: true,
  },
  type: { type: String, required: true },
});

const carouselContainer = ref<HTMLElement | null>(null);

const scrollAmount = 274;

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

const title = props.type == "all" ? "disponibles" : "likés";
</script>
