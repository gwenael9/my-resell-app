<template>
  <div class="mx-12 sm:mx-16 xl:mx-32 xl:px-16 pb-16 mt-4">
    <a-skeleton :loading="loading" active v-if="loading" />
    <div
      v-else-if="article"
      class="flex flex-col md:flex-row gap-6 sm:gap-12 h-full"
    >
      <div class="md:w-1/2">
        <img
          class="rounded-xl bg-gray-100 w-full"
          alt="image de l'article"
          :src="`/img/${article.imageAlt}.png`"
        />
      </div>
      <div class="flex flex-col md:w-1/2">
        <h2 class="text-2xl lg:text-4xl m-0">{{ article.title }}</h2>

        <!-- description -->
        <div class="mt-6">
          <h3 class="lg:text-lg font-semibold">Description</h3>
          <p
            class="text-gray-500 text-xs md:text-base border rounded md:min-h-20 p-2 mt-3"
          >
            {{ article.description }}
          </p>
        </div>

        <!-- infos -->
        <div class="mt-6 h-20">
          <h3 class="lg:text-lg font-semibold">Plus d'informations</h3>
          <div class="flex gap-4 mt-3">
            <a-badge :color="etatColor" :text="article.etat" />
            <a-badge color="blue" :text="article.categorie.name" />
            <a-badge color="blue" :text="article.size" />
          </div>
        </div>

        <!-- prix + button -->
        <div class="flex justify-between items-center my-6">
          <span class="text-xl sm:text-2xl font-semibold">
            {{ article.price }} €
          </span>

          <!-- pas mon article -->
          <div v-if="!isMyArticle" class="flex gap-2">
            <ButtonText
              :icon="panierStore.isInPanier(articleId) ? Check : ShoppingBag"
              type="primary"
              :text="
                panierStore.isInPanier(articleId)
                  ? 'Article dans le panier'
                  : 'Ajouter au panier'
              "
              :onClick="() => panierStore.handleAddOrDeleteToPanier(articleId)"
            />

            <ButtonNav
              :icon="Heart"
              @click="() => articlesStore.toggleLike(articleId)"
              :red="isLiked"
            />
          </div>

          <!-- mon article -->
          <div v-else class="flex gap-2">
            <ButtonText
              :icon="Pen"
              type="primary"
              text="Modifier l'article"
              class="hidden sm:block"
            />
            <ButtonNav :icon="Pen" class="sm:hidden" />
            <ButtonNav
              :icon="Trash2"
              :onClick="() => articlesStore.deleteArticle(articleId)"
            />
          </div>
        </div>

        <div class="flex-grow"></div>

        <!-- bas de la card -->
        <hr />
        <div class="flex justify-between mt-4">
          <p>{{ relativeTime }}</p>
          <p>{{ article.user.username }}</p>
        </div>
      </div>
    </div>
    <p class="text-center font-semibold text-xl" v-else>
      Cette article n'est pas disponible...
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { Heart, Trash2, Check, ShoppingBag, Pen } from "lucide-vue-next";
import dayjs from "dayjs";
import { useUserStore } from "@/stores/userStores";
import { usePanierStore } from "@/stores/panierStore";
import ButtonNav from "@/components/Buttons/ButtonNav.vue";
import ButtonText from "@/components/Buttons/ButtonText.vue";

const route = useRoute();
const articleId = Number(route.params.id);
const loading = ref(true);

const articlesStore = useArticlesStore();
const article = computed(() => articlesStore.article);

// recup l'user connecté
const userStore = useUserStore();

const panierStore = usePanierStore();

// vérifie si c'est l'article de l'utilisateur connecté
const isMyArticle = computed(() => {
  return userStore.user?.id === articlesStore.article?.user.id;
});

// vérifie si l'article est liké par l'utilisateur actuel
const isLiked = computed(() => articlesStore.isLiked(articleId));

// calcul du temps relatif
const relativeTime = computed(() => {
  if (!article.value?.createdAt) return "";

  const createdAt = dayjs(article.value.createdAt);
  const now = dayjs();
  const diffMinutes = now.diff(createdAt, "minute");

  if (diffMinutes < 1) {
    return "il y a 1 minute";
  } else if (diffMinutes < 60) {
    return `il y a ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
  } else if (diffMinutes < 1440) {
    const diffHours = now.diff(createdAt, "hour");
    return `il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  } else {
    const diffDays = now.diff(createdAt, "day");
    return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  }
});

// détermine la couleur du badge en fonction de l'état
const etatColor = computed(() => {
  if (!article.value?.etat) return "gray";

  const etat = article.value.etat
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (etat.includes("neuf")) {
    return "darkgreen";
  } else if (etat === "tres bon etat") {
    return "green";
  } else if (etat === "bon etat") {
    return "lightgreen";
  } else if (etat === "satisfaisant") {
    return "yellow";
  } else {
    return "gray";
  }
});

onMounted(async () => {
  loading.value = true;
  await articlesStore.fetchOneArticle(articleId);
  loading.value = false;
});
</script>
