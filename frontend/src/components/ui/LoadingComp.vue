<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-500 z-50"
  >
    <div class="p-5 bg-white rounded flex gap-2">
      <Loader2 class="animate-spin text-primary" />
    </div>
  </div>
</template>
<script setup>
import { Loader2 } from "lucide-vue-next";
</script>
