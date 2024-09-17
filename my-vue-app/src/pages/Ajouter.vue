<template>
  <div class="px-4">
    <h2 class="my-4 text-xl font-semibold">Ajouter un article</h2>
    <div class="flex justify-center">
      <form @submit="addArticle" class="flex flex-col gap-4 border rounded-md p-2 w-full max-w-[400px]">
        <div class="flex flex-col">
          <label for="name">Nom</label>
          <input class="border rounded-sm p-1" type="text">
        </div>
        <div class="flex flex-col">
          <label for="description">Description</label>
          <input class="border rounded-sm p-1" type="text">
        </div>
        <div class="flex flex-col">
          <label for="categorie">Catégorie</label>
          <input class="border rounded-sm p-1" type="text">
        </div>
        <div class="flex justify-end">
          <button class="rounded-md p-2 bg-green-500 text-white">Soumettre</button>
        </div>
      </form>
    </div>
  </div>
  </template>
  
  <script>
  
  export default {
    name: 'maPageAjout',
    components: {
    },
    method: {
      addArticle() {
        console.log("test");
      }
    }
  }
  </script>