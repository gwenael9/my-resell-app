<template>
  <div class="mx-8 p-4">
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
      <div class="flex flex-col">
        <a-button>Modifier mon profil</a-button>
        <a-button><StickyNote /></a-button>
        <a-button>Paramètres</a-button>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="font-semibold text-xl">Mes articles</h2>
      <div class="flex gap-4 flex-wrap">
        <CardArticle
          v-for="article in articlesStore.articlesUser"
          :key="article.id"
          :article="article"
        />
      </div>
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
