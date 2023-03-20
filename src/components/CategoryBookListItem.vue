<script setup lang="ts">
import { defineProps } from "vue";
import { BookItem } from "@/types";
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/main";

const cartStore = useCartStore();
const props = defineProps<{
  book: BookItem;
}>();

const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
</script>
<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 0.25em;
  max-width: 10.5em;
  color: var(--primary-color-dark);
  margin: 4em;
}

.book-title {
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-family: var(--default-font-family);
}

.book-author {
  /* font-style: italic; */
  font-size: 0.8rem;
  font-family: var(--default-font-family);
}

.book-price {
  font-weight: 600;
  font-family: var(--default-font-family);
}

.read-now-button {
  background-color: #d9d9d9;
  border: none;
  color: #656c71;
  height: auto;
  width: 100%;
  font-size: var(--font-size-sm);
  padding: 0;
  position: absolute;
  bottom: 0.8em;
}

.read-now-button:visited {
  background-color: #d9d9d9;
}

.read-now-button:hover {
  background-color: var(--secondary-background-color);
  color: white;
}

.book-image {
  position: relative;
  height: 200px;
  width: fit-content;
  max-width: 100%;
}

.add-to-cart-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  margin: 0.5em 0 0 0;
}

.featured {
  outline: 5px solid darkorange;
  border-radius: 10px;
}

.button:hover {
  background: darkslategrey;
}
</style>

<template>
  <li class="book-box" v-bind:class="{ featured: book.isFeatured }">
    <div class="book-image">
      <img
        :src="require('@/assets/images/books/' + bookImageFileName(book))"
        :alt="book.title"
      />
      <button v-if="book.isPublic" class="button read-now-button">
        Read Now
      </button>
    </div>
    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <div class="book-price">{{ asDollarsAndCents(book.price) }}</div>
    <button
      class="button add-to-cart-button"
      @click="cartStore.addToCart(book)"
    >
      <i class="fa-solid fa-cart-plus"></i> Add to Cart
    </button>
  </li>
</template>
