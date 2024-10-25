<template>
  <a-dropdown :trigger="['click']">
    <a-button type="primary" shape="circle">
      <UserOutlined />
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

<script lang="ts">
import { useUserStore } from "@/stores/userStores";
import { UserOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonProfile",
  components: {
    UserOutlined,
  },
  setup() {
    const userStore = useUserStore();

    const logoutUser = () => {
      userStore.logoutUser();
    };

    return {
      logoutUser,
    };
  },
});
</script>
