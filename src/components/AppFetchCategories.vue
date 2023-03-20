<template>
  <div>
    <AppHeader></AppHeader>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useCategoryStore } from "@/stores/CategoryStore";

const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
</script>

<style scoped></style>
