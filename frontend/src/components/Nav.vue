<template>
    <nav class="bg-blue-600 text-white py-4 shadow-lg">
      <div class="container mx-auto flex justify-around">
        <router-link
          to="/"
          class="text-lg font-medium hover:underline"
        >
          Strona główna
        </router-link>
        <router-link
          to="/dodawanie"
          class="text-lg font-medium hover:underline"
        >
          Dodaj film
        </router-link>
        <router-link
          to="/edycja"
          class="text-lg font-medium hover:underline"
        >
          Edytuj film
        </router-link>
        <router-link
          to="/single/:id"
          class="text-lg font-medium hover:underline"
        >
          Pojedynczy film
        </router-link>
        <router-link
          to="/Oaplikacji"
          class="text-lg font-medium hover:underline"
        >
          O aplikacji
        </router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  
  nav {
    background-color: #2563eb; 
  }
  </style>
  