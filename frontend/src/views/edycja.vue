<template>
  <div class="container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-xl">
    <h2 class="text-3xl font-extrabold text-center text-purple-700 mb-6">Edytuj Film</h2>

   
    <div v-if="successMessage" class="text-center text-green-700 font-semibold mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
      {{ successMessage }}
    </div>

    
    <div v-if="errorMessage" class="text-center text-red-700 font-semibold mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="validateAndSubmit" class="space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="title" class="block text-sm font-medium text-purple-800">Tytuł:</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="mt-2 w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="director" class="block text-sm font-medium text-purple-800">Reżyser:</label>
          <input
            type="text"
            id="director"
            v-model="formData.director"
            class="mt-2 w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="year" class="block text-sm font-medium text-purple-800">Rok:</label>
          <input
            type="number"
            id="year"
            v-model="formData.year"
            class="mt-2 w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="genre" class="block text-sm font-medium text-purple-800">Gatunek:</label>
          <input
            type="text"
            id="genre"
            v-model="formData.genre"
            class="mt-2 w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="seen" class="block text-sm font-medium text-purple-800">Obejrzany:</label>
          <select
            id="seen"
            v-model="formData.seen"
            class="mt-2 w-full p-3 border border-purple-400 rounded-lg focus:ring-purple-500 focus:border-purple-500 shadow-sm"
          >
            <option :value="true">Tak</option>
            <option :value="false">Nie</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <Button
          type="submit"
          class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md"
        >
          Zapisz zmiany
        </Button>
        <FormReset
          class="bg-gray-200 text-purple-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
          @reset="resetForm"
        />
      </div>
    </form>

    
    <div class="mt-8 bg-white p-4 rounded-lg shadow-lg">
      <Search @search="filterMovies" />
    </div>

   
    <div class="mt-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Lista Filmów</h2>
      <div
        v-for="movie in filteredMovies.length ? filteredMovies : movies"
        :key="movie._id"
        class="flex justify-between items-center mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-sm"
      >
        <span class="text-lg text-gray-700">{{ movie.title }} - {{ movie.director }} ({{ movie.year }})</span>
        <div>
          <Button
            @click="editMovie(movie)"
            class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 shadow-md"
          >
            Edytuj
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Button from "../components/Button.vue";
import FormReset from "../components/FormReset.vue";
import Search from "../components/Search.vue";

const movies = ref([]);
const filteredMovies = ref([]);
const searchQuery = ref("");
const formData = ref({ title: "", director: "", year: null, genre: "", seen: false });
const isEditing = ref(false);
const editingId = ref(null);
const successMessage = ref("");
const errorMessage = ref("");


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
  if (!isEditing.value) {
    errorMessage.value = "Wybierz film z listy przed zapisaniem.";
    clearMessages();
    return;
  }
  updateMovie();
};


const updateMovie = () => {
  formData.value.genre = String(formData.value.genre);

  axios
    .put(`http://localhost:5000/api/movies/${editingId.value}`, formData.value)
    .then(() => {
      fetchMovies();
      resetForm();
      successMessage.value = "Film został zapisany w bazie danych.";
      clearMessages();
    })
    .catch((error) => console.error("Błąd podczas aktualizacji filmu:", error));
};


const clearMessages = () => {
  setTimeout(() => {
    successMessage.value = "";
    errorMessage.value = "";
  }, 3000);
};


const editMovie = (movie) => {
  isEditing.value = true;
  editingId.value = movie._id;
  formData.value = { ...movie, genre: String(movie.genre) };
};


const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  formData.value = {
    title: "",
    director: "",
    year: null,
    genre: "",
    seen: false,
  };
};

onMounted(fetchMovies);
</script>

<style scoped>

</style>
