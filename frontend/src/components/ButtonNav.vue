<template>
  <a-button
    shape="circle"
    size="large"
    class="flex justify-center items-center"
    :class="{ 'text-green-500 border-green-500': green }"
  >
    <component :is="icon" :size="18" />
  </a-button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  icon: { type: Object, required: true },
  green: { type: Boolean, required: false },
});
</script>
