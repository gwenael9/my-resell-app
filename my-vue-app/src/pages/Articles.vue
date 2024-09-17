<template>
  <div class="px-4">
    <h1 class="my-4 text-xl font-semibold">Tout les articles disponibles ({{ items.length }})</h1>
    <div class="flex flex-wrap justify-center gap-3">
      <CardArticles v-for="item in items" :key="item.id" :article="item" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CardArticles from '../components/CardArticles.vue'
export default {
  name: 'monArticles',
  components: {
    CardArticles
  },
  data() {
    return {
      items: []
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/api/items");
      this.items = response.data
    } catch (err) {
      console.console.error(err);
      
    }
  }
}
</script>