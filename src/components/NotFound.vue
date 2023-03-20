<script setup lang="ts"></script>
<template>
  <div class="container">
    <h1>The page you were looking for was not found.</h1>
    <button class="button primary-button" @click="() => $router.push(`/`)">
      Home Page
    </button>
  </div>
</template>

<style scoped>
.primary-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  max-width: fit-content;
}

.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 5em auto;
}
</style>
