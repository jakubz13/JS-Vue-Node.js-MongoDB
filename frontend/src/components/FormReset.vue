<template>
    <Button
      @click="resetForm"
      class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Resetuj formularz
    </Button>
  </template>
  
  <script setup>
  import { defineEmits } from "vue";
  import Button from "./Button.vue"
  
  const emit = defineEmits(["reset"]);
  
  const resetForm = () => {
    emit("reset");
  };
  </script>
  
  <style scoped>
  
  </style>
  