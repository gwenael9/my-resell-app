<template>
  <div class="px-4">
    <h2 class="my-4 text-xl font-semibold">Tous les articles disponibles ({{ items.length }})</h2>
    <div class="flex flex-wrap justify-center gap-3">
      <CardArticles
        v-for="item in items"
        :key="item.id"
        :article="item"
        @article-deleted="fetchArticles"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardArticles from '../components/CardArticles.vue'

export default {
  name: 'mesArticles',
  components: {
    CardArticles
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    // recup tout nos articles
    async fetchArticles() {
      try {
        const response = await axios.get("http://localhost:3000/articles");
        this.items = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
