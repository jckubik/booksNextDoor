<script setup lang="ts">
import { inject, ref } from "vue";
import { useCategoryStore } from "@/stores/CategoryStore";

let mainMenuOpen = ref(false);
let subMenuOpen = ref(false);

function toggleMainMenu() {
  mainMenuOpen.value = !mainMenuOpen.value;
  if (subMenuOpen.value) {
    toggleSubMenu();
  }
}
function toggleSubMenu() {
  subMenuOpen.value = !subMenuOpen.value;
}

const categoryStore = useCategoryStore();
</script>

<style scoped>
.main-menu-container {
  position: relative;
}

.main-menu-panel {
  z-index: 1;
  position: absolute;
  right: -1em;
  transform: translateX(150%);
  transition-duration: 500ms;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  background-color: whitesmoke;
  color: white;
  cursor: pointer;
  box-shadow: 0 0 10px 0 #0008;
}

.main-menu-open {
  transform: translateX(0);
}

.main-menu-item {
  color: var(--primary-color-dark);
  font-weight: 600;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.5em 4em;
  white-space: nowrap;
  text-decoration: none;
}

.main-menu-item:hover {
  background: lightgrey;
}

.main-menu-button {
  background: none;
  margin: 2px 0 0 0;
  font-size: var(--font-size-xl);
  border: none;
  color: var(--primary-color);
}

.main-menu-button:hover {
  cursor: pointer;
  color: darkslategrey;
}

.sub-menu-panel {
  display: none;
  background-color: lightsteelblue;
}

.sub-menu-open {
  display: block;
}

.sub-menu-item {
  color: var(--primary-color-dark);
  font-weight: 600;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.5em 3em;
  white-space: nowrap;
  text-decoration: none;
}

.sub-menu-item:hover {
  color: white;
  background: lightslategrey;
}
</style>

<template>
  <div class="main-menu-container">
    <button class="icon-button main-menu-button" @click="toggleMainMenu">
      <i class="fas fa-bars"></i>
    </button>
    <ul class="main-menu-panel" :class="{ 'main-menu-open': mainMenuOpen }">
      <li class="sub-menu-container">
        <router-link
          class="main-menu-item sub-menu-button"
          :to="'#'"
          @click="toggleSubMenu"
        >
          Categories
        </router-link>
        <ul class="sub-menu-panel" :class="{ 'sub-menu-open': subMenuOpen }">
          <li
            v-for="category in categoryStore.categoryList"
            :key="category.categoryId"
          >
            <router-link
              class="sub-menu-item"
              :to="'../category/' + category.name"
            >
              {{ category.name }}
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <router-link class="main-menu-item" to="/">Search</router-link>
      </li>
      <li>
        <router-link class="main-menu-item" to="/">Account</router-link>
      </li>
      <li>
        <router-link class="main-menu-item" to="/">Cart (0)</router-link>
      </li>
    </ul>
  </div>
</template>
