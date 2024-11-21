<template>
  <a-dropdown :trigger="['click']">
    <ButtonNav :icon="User" :green="true" />
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <router-link to="/account">Mon compte</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/factures">Mes factures</router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-button key="3" type="text" danger @click="handleLogout">
          Déconnexion
        </a-button>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/userStores";
import { User } from "lucide-vue-next";
import ButtonNav from "./ButtonNav.vue";

const userStore = useUserStore();

const handleLogout = async () => {
  try {
    await userStore.logoutUser();
  } catch (error) {
    console.error("Erreur lors de la déconnexion", error);
  }
};
</script>
