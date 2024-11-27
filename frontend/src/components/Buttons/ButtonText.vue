<template>
  <a-button
    shape="round"
    size="large"
    class="flex justify-center items-center gap-2"
    :type="type"
  >
    <span class="text-sm">{{ text }}</span>
    <component :is="icon" :size="18" />
  </a-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  icon: { type: [Object, Function], required: true },
  type: { type: String, required: false },
  text: { type: String, required: true },
});
</script>
