<template>
  <a-breadcrumb class="mb-6">
    <a-breadcrumb-item>
      <router-link to="/"><HomeOutlined /></router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="(crumb, index) in crumbs" :key="index">
      <router-link v-if="crumb.to" :to="crumb.to">{{
        crumb.label
      }}</router-link>
      <span v-else>{{ crumb.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { defineProps } from "vue";
import { HomeOutlined } from "@ant-design/icons-vue";

// Props pour le tableau des breadcrumbs
defineProps({
  crumbs: {
    type: Array as PropType<Array<{ label: string; to?: string }>>,
    required: true,
  },
});
</script>
