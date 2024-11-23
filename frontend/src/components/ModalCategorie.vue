<template>
  <div>
    <ButtonNav :icon="Filter" @click="open = true" />
    <a-modal v-model:open="open" :footer="null" width="720px">
      <h2 class="text-2xl mb-2">Choix de la catégorie</h2>
      <p class="text-gray-500 mb-6">
        Veuillez renseigner les catégories souhaitées.
      </p>

      <div class="flex flex-wrap gap-2 my-4">
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
import { ref, onMounted, watch } from "vue";
import { Check, Filter, Plus } from "lucide-vue-next";
import ButtonNav from "./Buttons/ButtonNav.vue";
import { useCategoriesStore } from "@/stores/categorieStore";
import { defineEmits, defineProps } from "vue";
import ButtonText from "./Buttons/ButtonText.vue";

const emit = defineEmits(["selectCategorie"]);
const props = defineProps({
  initialCategories: {
    type: Array as () => string[],
    default: () => [],
  },
});

const open = ref<boolean>(false);

const selectedCategories = ref<string[]>([]);

const handlePush = (item: string) => {
  const index = selectedCategories.value.indexOf(item);
  if (index === -1) {
    // si la catégorie n'est pas encore dans le tableau, on l'ajoute
    selectedCategories.value.push(item);
  } else {
    // sinon on la retire
    selectedCategories.value.splice(index, 1);
  }
};

const resetSelect = () => {
  selectedCategories.value = [];
};

const categoriesStore = useCategoriesStore();

const confirmSelection = () => {
  emit("selectCategorie", selectedCategories.value);
  open.value = false;
};

// synchronisation des catégories initiales avec les catégories sélectionnées
onMounted(() => {
  categoriesStore.fetchCategories();
  selectedCategories.value = [...props.initialCategories];
});

// remet à jour les catégories sélectionnées lors de la réouverture
watch(open, (isOpen) => {
  if (isOpen) {
    selectedCategories.value = [...props.initialCategories];
  }
});
</script>
