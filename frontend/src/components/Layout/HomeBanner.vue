<template>
  <div class="flex flex-col items-center py-8 gap-4">
    <h1 class="text-4xl text-center">Bienvenue sur ResellApp</h1>
    <p class="sm:w-1/2 text-center">
      Rejoignez plus d'un million d'utilisateurs sur ResellApp et donnez une
      nouvelle vie à vos objets tout en faisant des économies !
    </p>
    <div class="flex gap-2">
      <ModalArticle
        :isAdd="true"
        v-if="userStore.isAuthenticated"
        text="Ajouter un article"
      />
      <ModalLogin v-else text="Se connecter" />
      <ButtonText
        text="Voir les articles"
        :icon="Shirt"
        type="primary"
        @click="router.push('/articles')"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStores";
import ModalArticle from "../Article/ModalArticle.vue";
import ButtonText from "../Buttons/ButtonText.vue";
import { Shirt } from "lucide-vue-next";
import { useRouter } from "vue-router";
import ModalLogin from "../Auth/ModalLogin.vue";

const userStore = useUserStore();
const router = useRouter();
</script>
