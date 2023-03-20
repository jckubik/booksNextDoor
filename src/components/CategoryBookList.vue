<script setup lang="ts">
import CategoryBookListItem from "@/components/CategoryBookListItem.vue";
import { useBookStore } from "@/stores/BookStore";

const bookStore = useBookStore();
</script>

<style scoped>
.book-box-ul {
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  padding: 1em;
  justify-content: center;
}

.category-book-list {
  display: grid;
}
</style>

<template>
  <ul class="book-box-ul">
    <template v-for="book in bookStore.bookList" :key="book.bookId">
      <category-book-list-item :book="book"></category-book-list-item>
    </template>
  </ul>
</template>
