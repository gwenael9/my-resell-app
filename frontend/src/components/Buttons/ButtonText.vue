<template>
  <a href="#">
    <a-button
      shape="round"
      size="large"
      class="flex justify-center items-center gap-2"
      :type="type"
      @click="onClick"
    >
      <span class="text-sm">{{ text }}</span>
      <component :is="icon" :size="18" />
    </a-button>
  </a>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  icon: { type: Object, required: true },
  onClick: { type: Function, required: false },
  type: { type: String, required: true },
  text: { type: String, required: true },
});
</script>
