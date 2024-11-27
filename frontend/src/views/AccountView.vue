<template>
  <BreadCrumb
    :crumbs="[{ label: isPublicProfile ? 'Profil public' : 'Mon compte' }]"
  />
  <LoadingComp v-if="loading" />
  <div class="flex flex-col justify-between">
    <div class="flex gap-6">
      <div class="w-1/5 rounded-full overflow-hidden max-w-[120px]">
        <img :src="`/img/avatars/${profile?.avatar}.jpg`" alt="avatar" />
      </div>
      <div class="flex flex-col">
        <span class="font-semibold sm:text-xl">{{ profile?.username }}</span>
        <span v-if="!isPublicProfile" class="font-semibold text-gray-500">
          {{ userStore.user?.email }}
        </span>
      </div>
    </div>
    <div
      v-if="!isPublicProfile"
      class="flex justify-between sm:justify-end mt-4 sm:mt-0 gap-2"
    >
      <a-button>
        <router-link :to="{ name: 'factures' }">
          Voir mes factures
        </router-link>
      </a-button>
      <a-button>
        <router-link :to="{ name: 'parametres' }">Paramètres</router-link>
      </a-button>
    </div>
  </div>
  <hr class="my-4" />
  <div class="flex justify-between items-center font-semibold">
    <p class="text-xl">Dressing</p>
    <p>
      {{ articlesStore.articlesUser.length }}
      {{ articlesStore.articlesUser.length > 1 ? "articles" : "article" }}
    </p>
  </div>
  <div v-if="articlesStore.articlesUser.length > 0">
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <CardArticle
        v-for="article in articlesStore.articlesUser"
        :key="article.id"
        :article="article"
      />
    </div>
  </div>
  <div class="flex flex-col items-center font-semibold" v-else>
    <p>
      {{
        isPublicProfile
          ? "Cet utilisateur n'a aucun article en vente."
          : "Vous n'avez aucun article en vente actuellement."
      }}
    </p>
    <ModalArticle
      :isAdd="true"
      v-if="!isPublicProfile"
      text="Ajouter un article"
    />
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";
import CardArticle from "@/components/Article/CardArticle.vue";
import { onMounted, computed, ref } from "vue";
import BreadCrumb from "@/components/ui/BreadCrumb.vue";
import { useRoute } from "vue-router";
import LoadingComp from "@/components/ui/LoadingComp.vue";
import ModalArticle from "@/components/Article/ModalArticle.vue";

const route = useRoute();
const userStore = useUserStore();
const articlesStore = useArticlesStore();
const loading = ref<boolean>(true);

// Vérifie si c'est un profil public
const isPublicProfile = computed(() => !!route.params.id);

// Détermine quel profil afficher
const profile = computed(() =>
  isPublicProfile.value ? userStore.profilePublic : userStore.user
);

onMounted(async () => {
  if (isPublicProfile.value) {
    const userId = route.params.id as string;
    await userStore.fetchUserPublic(userId);
    loading.value = false;
  } else {
    await userStore.fetchUser();
    loading.value = false;
  }
});
</script>
