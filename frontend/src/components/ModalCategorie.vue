<template>
  <div>
    <ButtonNav :icon="Filter" @click="open = true" />
    <a-modal v-model:open="open" :footer="null" width="720px">
      <h2 class="text-2xl mb-2">Choix de la catégorie</h2>
      <p class="text-gray-500 mb-6">
        Veuillez renseigner les catégories souhaitées.
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <ButtonText
          v-for="categorie in categoriesStore.categories"
          :key="categorie.id"
          :type="
            selectedCategories.includes(categorie.id.toString())
              ? 'primary'
              : 'default'
          "
          :text="categorie.name"
          :icon="
            selectedCategories.includes(categorie.id.toString()) ? Check : Plus
          "
          @click="handlePush(categorie.id.toString())"
        />
      </div>

      <div class="flex justify-end gap-2">
        <a-button @click="resetSelect">Reinitialiser</a-button>
        <a-button type="primary" @click="confirmSelection">
          Confirmer
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Check, Filter, Plus } from "lucide-vue-next";
import ButtonNav from "./Buttons/ButtonNav.vue";
import { useCategoriesStore } from "@/stores/categorieStore";
import { defineEmits } from "vue";
import ButtonText from "./Buttons/ButtonText.vue";

const emit = defineEmits(["selectCategorie"]);

// Ouverture de la modal
const open = ref<boolean>(false);

// Variable pour stocker les catégories sélectionnées
const selectedCategories = ref<string[]>([]);

const handlePush = (item: string) => {
  const index = selectedCategories.value.indexOf(item);
  if (index === -1) {
    // Si la catégorie n'est pas encore dans le tableau, on l'ajoute
    selectedCategories.value.push(item);
  } else {
    // Si la catégorie est déjà dans le tableau, on la retire
    selectedCategories.value.splice(index, 1);
  }
};

const resetSelect = () => {
  selectedCategories.value = [];
};

const categoriesStore = useCategoriesStore();

// Méthode appelée lors de la confirmation de la sélection
const confirmSelection = () => {
  emit("selectCategorie", selectedCategories.value); // Émet les IDs des catégories sélectionnées
  open.value = false; // Ferme la modal
};

// Fetch des catégories au montage
onMounted(() => {
  categoriesStore.fetchCategories();
});
</script>
