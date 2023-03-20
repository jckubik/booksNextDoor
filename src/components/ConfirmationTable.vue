<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/main";
import { BookItem } from "@/types";
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";

const { order, customer, books, lineItems } = useOrderDetailsStore();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};
</script>
<template>
  <div class="order-details">
    <div
      v-for="(item, index) in lineItems"
      :key="item.bookId"
      class="order-item"
    >
      <div class="cart-book-image">
        <img
          :src="
            require('@/assets/images/books/' + bookImageFileName(books[index]))
          "
          :alt="books[index].title"
          width="100px"
          height="auto"
        />
      </div>
      <div>
        {{ books[index].title }}
      </div>
      <div class="quantity">
        {{ item.quantity }}
      </div>
      <div class="price">
        {{ asDollarsAndCents(item.quantity * books[index].price) }}
      </div>
    </div>
    <div class="cost-container">
      <div class="price-labels">
        <p>Items:</p>
        <p>Surcharge:</p>
        <p><span class="total">Total:</span></p>
      </div>
      <div class="price">
        <p>{{ asDollarsAndCents(order.amount - 500) }}</p>
        <p>{{ asDollarsAndCents(500) }}</p>
        <p>
          <span class="total">{{ asDollarsAndCents(order.amount) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.quantity {
  text-align: end;
}

.cart-book-image {
  padding: 0 1em;
}

img {
  display: block;
  width: 100px;
  height: auto;
}

.order-item {
  display: grid;
  grid-template-columns: 1fr 1.2fr 0.5fr 1fr;
  gap: 1em;
}

.cost-container {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  border-top: 1px solid var(--primary-color-dark);
}

.total {
  font-weight: bold;
}

.price-labels {
  text-align: start;
}

.price {
  text-align: end;
  width: 100%;
}
</style>
