<template>
  <div class="mt-6 text-white">
    <h1 class="text-center font-bold text-lg">Mon compte</h1>
    <div class="text-center">
      <p>{{ userStore.user?.username }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/userStores";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AccountView",
  components: {},
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
});
</script>
