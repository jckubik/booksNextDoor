<script setup lang="ts">
import { watch } from "vue";
import CategoryNav from "@/components/CategoryNav.vue";
import CategoryBookList from "@/components/CategoryBookList.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useBookStore } from "@/stores/BookStore";
import { useCategoryStore } from "@/stores/CategoryStore";

const route = useRoute();
const router = useRouter();
const bookStore = useBookStore();
const categoryStore = useCategoryStore();

watch(
  () => route.params.name,
  (newName) => {
    categoryStore.updateSelectedCategoryName(newName as string);
    bookStore.fetchBooks(newName as string).catch(() => {
      router.push("/not-found");
    });
  },
  { immediate: true }
);
</script>

<style scoped>
.category-page {
  overflow: hidden;
  flex: 7;
}
</style>

<template>
  <div class="category-page">
    <category-nav></category-nav>
    <category-book-list> </category-book-list>
  </div>
</template>
