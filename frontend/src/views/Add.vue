<template>
  <div class="container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-xl">
    <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">Dodaj / Edytuj Film</h2>

  
    <form @submit.prevent="validateAndSubmit" class="space-y-8 bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="title" class="block text-sm font-semibold text-gray-800">Tytuł:</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="director" class="block text-sm font-semibold text-gray-800">Reżyser:</label>
          <input
            type="text"
            id="director"
            v-model="formData.director"
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="year" class="block text-sm font-semibold text-gray-800">Rok:</label>
          <input
            type="number"
            id="year"
            v-model="formData.year"
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="genre" class="block text-sm font-semibold text-gray-800">Gatunek:</label>
          <input
            type="text"
            id="genre"
            v-model="formData.genre"
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="seen" class="block text-sm font-semibold text-gray-800">Obejrzany:</label>
          <select
            id="seen"
            v-model="formData.seen"
            class="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            <option :value="true">Tak</option>
            <option :value="false">Nie</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <Button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
        >
          {{ isEditing ? "Zapisz zmiany" : "Dodaj Film" }}
        </Button>
        <FormReset @reset="resetForm" />
      </div>
    </form>

   
    <div class="mt-8 bg-gray-200 p-6 rounded-lg shadow-lg">
      <Search @search="filterMovies" />
    </div>

  
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Lista filmów</h2>
      <div
        v-for="movie in filteredMovies"
        :key="movie._id"
        class="flex justify-between items-center mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md"
      >
        <span class="text-lg text-gray-700 font-medium">{{ movie.title }} - {{ movie.director }} ({{ movie.year }})</span>
        <div>
          <Button
            @click="editMovie(movie)"
            class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 shadow-md mr-2"
          >
            Edytuj
          </Button>
          <Button
            @click="deleteMovie(movie._id)"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
          >
            Usuń
          </Button>
        </div>
      </div>
    </div>

   
    <div class="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
      <Watchlist :movies="movies" />
    </div>

    
    <div class="mt-12 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-200">
      <MovieGenres :movies="movies" />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Button from "../components/Button.vue";
import FormReset from "../components/FormReset.vue";
import Search from "../components/Search.vue";
import Watchlist from "../components/Watchlist.vue";
import MovieGenres from "../components/MovieGenres.vue"; 

const movies = ref([]); 
const filteredMovies = ref([]); 
const formData = ref({ title: "", director: "", year: null, genre: "", seen: false });
const isEditing = ref(false);
const editingId = ref(null);


const fetchMovies = () => {
  axios
    .get("http://localhost:5000/api/movies")
    .then((response) => {
      movies.value = response.data;
      filteredMovies.value = response.data;
    })
    .catch((error) => console.error("Błąd podczas pobierania filmów:", error));
};


const filterMovies = (searchTerm) => {
  if (!searchTerm.trim()) {
    filteredMovies.value = movies.value;
  } else {
    filteredMovies.value = movies.value.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};


const validateAndSubmit = () => {
  if (!formData.value.genre || typeof formData.value.genre !== "string") {
    console.error("Pole Gatunek musi być stringiem.");
    return;
  }
  if (isEditing.value) {
    updateMovie();
  } else {
    addMovie();
  }
};

const addMovie = () => {
  axios
    .post("http://localhost:5000/api/movies", formData.value)
    .then((response) => {
      movies.value.push(response.data);
      filteredMovies.value = [...movies.value];
      resetForm();
    })
    .catch((error) => console.error("Błąd podczas dodawania filmu:", error));
};

const updateMovie = () => {
  axios
    .put(`http://localhost:5000/api/movies/${editingId.value}`, formData.value)
    .then((response) => {
      const index = movies.value.findIndex((movie) => movie._id === response.data._id);
      if (index !== -1) {
        movies.value[index] = response.data;
        filteredMovies.value = [...movies.value];
      }
      resetForm();
    })
    .catch((error) => console.error("Błąd podczas aktualizacji filmu:", error));
};

const editMovie = (movie) => {
  isEditing.value = true;
  editingId.value = movie._id;
  formData.value = { ...movie };
};

const deleteMovie = (id) => {
  axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(() => {
      movies.value = movies.value.filter((movie) => movie._id !== id);
      filteredMovies.value = [...movies.value];
    })
    .catch((error) => console.error("Błąd podczas usuwania filmu:", error));
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  formData.value = { title: "", director: "", year: null, genre: "", seen: false };
};

onMounted(fetchMovies);
</script>

<style scoped>

</style>
