<template>
  <a-dropdown :trigger="['click']">
    <ButtonNav :icon="User" :green="true" />
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          <router-link :to="{ name: 'compte' }">
            <div class="flex items-center gap-2">
              <User :size="14" />
              <span>Compte</span>
            </div>
          </router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link :to="{ name: 'factures' }">
            <div class="flex items-center gap-2">
              <StickyNote :size="14" />
              <span>Factures</span>
            </div>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="{ name: 'parametres' }">
            <div class="flex items-center gap-2">
              <Settings :size="14" />
              <span>Paramètres</span>
            </div>
          </router-link>
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
import ButtonNav from "./ButtonNav.vue";
import { Settings, StickyNote, User } from "lucide-vue-next";
const userStore = useUserStore();
</script>
