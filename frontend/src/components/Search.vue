<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Wyszukaj filmy..."
      class="w-full p-2 border border-gray-300 rounded"
    />
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";


const emit = defineEmits(["search"]);
const searchQuery = ref("");


const onSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped>

</style>
