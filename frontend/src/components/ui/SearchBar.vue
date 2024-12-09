<template>
  <a-form :model="formState" @finish="handleSearch">
    <div class="border flex rounded-full overflow-hidden h-10 p-2">
      <input
        class="focus:outline-none"
        placeholder="Rechercher..."
        v-model="formState.search"
      />
      <button html-type="submit">
        <Search :size="18" />
      </button>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { defineEmits, defineProps, reactive } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const formState = reactive({
  search: props.modelValue,
});

const emit = defineEmits<{
  (e: "search", value: string): void;
}>();

const handleSearch = () => {
  if (formState.search !== "") {
    emit("search", formState.search);
  }
};
</script>
