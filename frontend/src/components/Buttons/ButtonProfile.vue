<template>
  <a-dropdown :trigger="['click']">
    <ButtonNav :icon="User" :green="true" />
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <router-link to="/compte">Mon compte</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/factures">Mes factures</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/compte/parametres">Paramètres</router-link>
        </a-menu-item>
        <a-menu-divider />
        <a-button key="3" type="text" danger @click="userStore.logoutUser">
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
</script>
