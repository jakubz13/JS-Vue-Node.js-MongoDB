<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Szczegóły Filmu</h2>

    <div v-if="movie" class="p-4 border border-gray-300 rounded">
      <h3 class="text-xl font-semibold">{{ movie.title }}</h3>
      <p><strong>Reżyser:</strong> {{ movie.director }}</p>
      <p><strong>Rok:</strong> {{ movie.year }}</p>
      <p><strong>Gatunek:</strong> {{ movie.genre }}</p>
      <p><strong>Obejrzany:</strong> {{ movie.seen ? 'Tak' : 'Nie' }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p>Nie podałeś w URL id filmu</p>
    </div>

    <div class="mt-4">
      <router-link to="/" class="text-blue-500 hover:underline">Powrót do listy filmów</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const movie = ref(null);

const fetchMovie = async () => {
  try {
    const id = route.params.id; 
    const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
    movie.value = response.data; 
  } catch (error) {
    console.error('Błąd podczas pobierania szczegółów filmu:', error);
  }
};

onMounted(fetchMovie); 
</script>

<style scoped>

</style>
