<template>
  <a-badge :count="numberBadge" :offset="[-20, 40]">
    <a-button
      shape="circle"
      :type="type"
      size="large"
      class="flex justify-center items-center"
      :class="{ 'text-green-500 border-green-500': green }"
      :danger="danger"
    >
      <component :is="icon" :size="18" :class="{ 'text-red-500': red }" />
    </a-button>
  </a-badge>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  icon: { type: [Object, Function], required: true },
  green: { type: Boolean, required: false },
  numberBadge: { type: Number, required: false },
  red: { type: Boolean, required: false },
  danger: { type: Boolean, required: false },
  type: { type: String, required: false },
});
</script>
