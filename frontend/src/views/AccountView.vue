<template>
  <div class="mx-8">
    <BreadCrumb :crumbs="[{ label: 'Mon compte' }]" />
    <div class="flex justify-between">
      <div class="flex gap-12">
        <div class="w-1/5 rounded-full overflow-hidden">
          <img src="/img/avatar.jpg" alt="avatar" />
        </div>
        <div class="flex flex-col">
          <span class="font-semibold text-xl">{{
            userStore.user?.username
          }}</span>
          <span class="font-semibold text-gray-500">{{
            userStore.user?.email
          }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <a-button type="link">
          <router-link :to="{ name: 'factures' }">
            Voir mes factures
          </router-link>
        </a-button>
        <a-button type="link">
          <router-link :to="{ name: 'parametres' }">Paramètres</router-link>
        </a-button>
      </div>
    </div>
    <hr class="my-4" />
    <div v-if="articlesStore.articlesUser.length > 0">
      <h2 class="font-semibold text-xl">Mes articles</h2>
      <div class="flex gap-4 flex-wrap">
        <CardArticle
          v-for="article in articlesStore.articlesUser"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
    <div class="text-center" v-else>
      <p>Vous n'avez aucun article en vente actuellement.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";
import CardArticle from "@/components/Article/CardArticle.vue";
import { onMounted } from "vue";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { StickyNote } from "lucide-vue-next";

const userStore = useUserStore();
const articlesStore = useArticlesStore();

onMounted(() => {
  articlesStore.fetchArticlesFromUser();
});
</script>
