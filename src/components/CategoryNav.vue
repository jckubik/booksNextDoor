<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/CategoryStore";

const categoryStore = useCategoryStore();
const route = useRoute();

let showNav = ref(false);
function transitionNav() {
  setTimeout(() => (showNav.value = true), 500);
}
onMounted(() => transitionNav());
</script>

<style scoped>
.category-nav {
  position: relative;
  right: 0;
  overflow: hidden;
  transform: translateX(-100%);
  transition-duration: 500ms;
  transition-property: transform;
  transition-timing-function: ease-in-out;
}

.category-nav-move {
  transform: translateX(0);
}

.category-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1em;
  text-align: center;
  font-family: var(--default-font-family);
  font-weight: 400;
  font-size: var(--font-size-base);
  border-bottom: 1px solid var(--primary-color-dark);
  padding: 0 0 0.2em 0;
}

.category-button.selected-category-button {
  border-bottom: 5px solid var(--primary-color);
}

.category-button.unselected-category-button,
.category-button.unselected-category-button:visited {
  color: var(--primary-color-dark);
}

.category-button.unselected-category-button:hover,
.category-button.unselected-category-button:active {
  border-bottom: 2px solid var(--primary-color);
}

a.category-button {
  text-decoration: none;
  color: var(--primary-color-dark);
}
</style>

<template>
  <nav class="category-nav" :class="{ 'category-nav-move': showNav }">
    <ul class="category-buttons">
      <li
        v-for="category in categoryStore.categoryList"
        :key="category.categoryId"
      >
        <router-link
          :to="{ name: 'category-view', params: { name: category.name } }"
          :class="
            category.name === route.params.name
              ? 'selected-category-button'
              : 'unselected-category-button'
          "
          class="category-button unselected-category-button"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
