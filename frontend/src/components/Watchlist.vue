<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Lista filmów</h2>
  
    
      <div>
        <h3 class="text-xl font-semibold mb-2">Filmy nieobejrzane</h3>
        <div
          v-for="movie in unseenMovies"
          :key="movie._id"
          class="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded"
        >
          <span>{{ movie.title }} - {{ movie.director }}</span>
          <Button
            @click="toggleWatchlist(movie)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Dodaj do listy oglądania
          </Button>
        </div>
      </div>
  
     
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-2">Filmy do obejrzenia</h3>
        <div
          v-if="watchlist.length"
          v-for="movie in watchlist"
          :key="movie._id"
          class="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded"
        >
          <span>{{ movie.title }} - {{ movie.director }}</span>
          <Button
            @click="toggleWatchlist(movie)"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Usuń z listy oglądania
          </Button>
        </div>
        <div v-else>
          <p class="text-gray-500">Brak filmów na liście oglądania.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  import Button from "../components/Button.vue"; 
  
  
  const props = defineProps({
    movies: {
      type: Array,
      required: true,
    },
  });
  

  const watchlist = ref([]);
  const unseenMovies = computed(() => props.movies.filter((movie) => !movie.seen));
  
  
  const toggleWatchlist = (movie) => {
    movie.seen = !movie.seen;
    const index = watchlist.value.findIndex((m) => m._id === movie._id);
    if (index === -1) {
      watchlist.value.push(movie);
    } else {
      watchlist.value.splice(index, 1);
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  