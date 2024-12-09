<template>
  <a-badge :count="numberBadge" :offset="[-20, 40]">
    <a-button
      shape="circle"
      :type="type"
      :size="size"
      class="flex justify-center items-center"
      :class="{ 'text-green-500 border-green-500': green }"
      :danger="danger"
      :ghost="ghost"
    >
      <span>{{ text }}</span>
      <component
        :is="icon"
        :size="size == 'large' ? 18 : 14"
        :class="{ 'text-red-500': red }"
      />
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
  ghost: { type: Boolean, required: false },
  type: { type: String, required: false },
  size: { type: String, default: "large" },
  text: { type: Number, required: false },
});
</script>
