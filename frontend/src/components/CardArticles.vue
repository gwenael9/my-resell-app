<template>
    <div class="flex flex-col border rounded-md p-2 w-52 min-h-52">
      <h2 class="font-semibold uppercase">{{ article.name }}</h2>
      <p class="text-sm">{{ article.description }}</p>
      <div class="flex-grow"></div>
      <div class="flex justify-between p-2">
        <p class="text-xs uppercase italic">{{ article.categorie }}</p>
        <button @click="showModal = true">
          <XMarkIcon class="h-5 w-5 text-red-500"/>
        </button>
      </div>

      <ModalConfirm
        v-if="showModal"
        :show="showModal"
        title="Confirmer la suppression"
        message="Voulez-vous vraiment supprimer cet article ?"
        @confirm="deleteArticle(article.id)"
        @cancel="showModal = false"
      />
    </div>
  </template>
  
  <script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import axios from 'axios';
import ModalConfirm from "./ModalConfirm.vue";

  export default {
    name: "CardArticles",
    props: {
      article: {
        type: Object,
        required: true,
      }
    },
    components: {
      XMarkIcon, 
      ModalConfirm
    },
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      async deleteArticle(id) {
        try {
          const response = await axios.delete(`http://localhost:4000/articles/${id}`);
          console.log(response.data);
          this.$emit('article-deleted', id);
          // ferme la modal
          this.showModal = false;
        } catch (err) {
          console.error("Erreur lors de la suppression.");
        }
      }
    },
  }
  </script>
