<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import ButtonText from "../Buttons/ButtonText.vue";
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  type: { type: String },
});

const router = useRouter();
</script>

<template>
  <p class="mt-4 flex flex-col items-center font-semibold">
    <a-empty description="Aucun article de disponible." />
    <ButtonText
      v-if="props.type == 'favoris'"
      :icon="ArrowRight"
      text="Voir tout les articles"
      @click="router.push('/articles')"
    />
  </p>
</template>
