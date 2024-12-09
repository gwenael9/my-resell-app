<template>
  <a-modal
    v-model:open="localOpen"
    :title="title"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="Confirmer"
    cancelText="Retour"
  >
    <p>{{ message }}</p>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from "vue";

const props = defineProps({
  open: { type: Boolean, required: true },
  title: { type: String, default: "Confirmation" },
  message: { type: String, required: true },
});

const emit = defineEmits(["confirm", "update:open"]);

const localOpen = ref(props.open);

watch(
  () => props.open,
  (newValue) => {
    localOpen.value = newValue;
  }
);

const handleOk = () => {
  emit("confirm");
  emit("update:open", false);
};

const handleCancel = () => {
  emit("update:open", false);
};
</script>
