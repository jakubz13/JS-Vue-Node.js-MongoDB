<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Filmy według gatunków</h2>
  
   
      <div class="mb-4">
        <h3 class="text-xl font-semibold">Wybierz Gatunek:</h3>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="genre in uniqueGenres"
            :key="genre"
            @click="filterByGenre(genre)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {{ genre }}
          </button>
        </div>
      </div>
  
   
      <div>
        <h3 class="text-xl font-semibold mb-4">Filmy w wybranym gatunku: {{ selectedGenre }}</h3>
        <div
          v-if="filteredMovies.length"
          v-for="movie in filteredMovies"
          :key="movie._id"
          class="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded"
        >
          <span>{{ movie.title }} - {{ movie.director }} ({{ movie.year }})</span>
        </div>
        <div v-else>
          <p class="text-gray-500">Brak filmów w tym gatunku.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import axios from "axios";
  
  const movies = ref([]);
  const filteredMovies = ref([]); 
  const selectedGenre = ref(""); 
  

  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((response) => {
        movies.value = response.data;
        filteredMovies.value = response.data; 
      })
      .catch((error) => console.error("Błąd podczas pobierania filmów:", error));
  };
  
 
  const uniqueGenres = computed(() => {
    const genres = movies.value.map((movie) => movie.genre);
    return [...new Set(genres)];
  });
  
  
  const filterByGenre = (genre) => {
    selectedGenre.value = genre;
    filteredMovies.value = movies.value.filter((movie) => movie.genre === genre);
  };
  
  onMounted(fetchMovies);
  </script>
  
  <style scoped>
  
  </style>
  