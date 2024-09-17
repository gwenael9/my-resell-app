<template>
    <div class="border rounded-md p-2 relative">
      <h2 class="font-semibold uppercase">{{ article.name }}</h2>
      <p class="absolute top-0 right-0 text-xs lowercase">{{ article.categorie }}</p>
      <p>{{ article.description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardArticles",
    props: {
      article: {
        type: Object,
        required: true,
      }
    }
  }
  </script>
