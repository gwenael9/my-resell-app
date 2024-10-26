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
      <p>{{ article.user.email }}</p>
      <a-button>Voir</a-button>
    </div>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Article } from "@/types";

export default defineComponent({
  name: "CardArticle",
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
