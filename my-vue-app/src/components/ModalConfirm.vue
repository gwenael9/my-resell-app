<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div class="flex flex-col bg-white p-4 rounded-md shadow-md w-96 h-48">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <p class="mb-4">{{ message }}</p>
        <div class="flex-grow"></div>
        <div class="flex justify-end space-x-4">
            <button @click="cancel" class="px-4 py-2 rounded">Non</button>
            <button @click="confirm" class="bg-red-500 text-white px-4 py-2 rounded">Oui</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalConfirm',
    props: {
      title: {
        type: String,
        default: 'Confirmation',
      },
      message: {
        type: String,
        required: true,
      },
      show: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      cancel() {
        this.$emit('cancel');
      }
    }
  };
  </script>