<template>
  <div
    class="flex items-center border border-gray-300 rounded-full w-full justify-between sm:max-w-[300px] px-2"
  >
    <input
      type="search"
      name="searchArticle"
      id="searchId"
      placeholder="Rechercher..."
      class="focus:outline-none"
      v-model="searchQuery"
      @input="onInput"
    />
    <button @click="handleSearch">
      <Search :size="18" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps } from "vue";
import { Search } from "lucide-vue-next";

const emit = defineEmits(["update:modelValue", "search"]);
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const searchQuery = ref(props.modelValue);

const onInput = () => {
  emit("update:modelValue", searchQuery.value); // Émet la mise à jour à chaque saisie
  emit("search", searchQuery.value); // Émet l'événement de recherche
};

const handleSearch = () => {
  emit("search", searchQuery.value); // Émet une recherche immédiate lors d'un clic
};
</script>
