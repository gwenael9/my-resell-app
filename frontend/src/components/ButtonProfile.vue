<template>
  <a-dropdown :trigger="['click']">
    <a-button
      size="large"
      shape="circle"
      class="flex justify-center items-center"
    >
      <User :size="18" />
    </a-button>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <router-link to="/compte">Mon compte</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/factures">Mes factures</router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-button key="3" type="text" danger @click="logoutUser"
          >Déconnexion</a-button
        >
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { useArticlesStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStores";
import { User } from "lucide-vue-next";

const userStore = useUserStore();
const articlesStore = useArticlesStore();

const logoutUser = () => {
  userStore.logoutUser();
  articlesStore.fetchArticles();
};
</script>
