<template>
  <div class="container mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-xl">
    <h2 class="text-3xl font-extrabold text-center text-indigo-700 mb-6">Dodaj Nowy Film</h2>

    
    <form @submit.prevent="validateAndSubmit" class="space-y-8 bg-white p-8 rounded-lg shadow-lg border border-gray-300">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="title" class="block text-sm font-medium text-indigo-800">Tytuł:</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="mt-2 w-full p-3 border border-indigo-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="director" class="block text-sm font-medium text-indigo-800">Reżyser:</label>
          <input
            type="text"
            id="director"
            v-model="formData.director"
            class="mt-2 w-full p-3 border border-indigo-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="year" class="block text-sm font-medium text-indigo-800">Rok:</label>
          <input
            type="number"
            id="year"
            v-model="formData.year"
            class="mt-2 w-full p-3 border border-indigo-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="genre" class="block text-sm font-medium text-indigo-800">Gatunek:</label>
          <input
            type="text"
            id="genre"
            v-model="formData.genre"
            class="mt-2 w-full p-3 border border-indigo-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            required
          />
        </div>
        <div>
          <label for="seen" class="block text-sm font-medium text-indigo-800">Obejrzany:</label>
          <select
            id="seen"
            v-model="formData.seen"
            class="mt-2 w-full p-3 border border-indigo-400 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          >
            <option :value="true">Tak</option>
            <option :value="false">Nie</option>
          </select>
        </div>
      </div>

      <div class="flex justify-center gap-4">
        <Button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Dodaj Film
        </Button>
        <FormReset
          class="bg-gray-200 text-indigo-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
          @reset="resetForm"
        />
      </div>
    </form>

    <div v-if="errorMessage" class="text-red-500 mt-4 text-center font-semibold">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="text-green-500 mt-4 text-center font-semibold">
      {{ successMessage }}
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";
import Button from "../components/Button.vue"; 
import FormReset from "../components/FormReset.vue"; 

const formData = ref({
  title: "",
  director: "",
  year: "",
  genre: "",
  seen: false,
});

const errorMessage = ref("");
const successMessage = ref("");


const clearMessages = () => {
  setTimeout(() => {
    errorMessage.value = "";
    successMessage.value = "";
  }, 3000); 
};


const validateAndSubmit = () => {
 
  errorMessage.value = "";
  successMessage.value = "";

  addMovie();
};


const addMovie = () => {
  
  formData.value.genre = String(formData.value.genre);

  axios
    .post("http://localhost:5000/api/movies", formData.value)
    .then(() => {
      successMessage.value = "Film został pomyślnie dodany!";
      resetForm();
      clearMessages();
    })
    .catch((error) => {
      errorMessage.value =
        error.response?.data?.message || "Błąd podczas dodawania filmu.";
      console.error("Błąd podczas dodawania filmu:", error);
      clearMessages();
    });
};


const resetForm = () => {
  formData.value = {
    title: "",
    director: "",
    year: "",
    genre: "",
    seen: false,
  };
};
</script>

<style scoped>

</style>
