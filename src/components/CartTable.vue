<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import { asDollarsAndCents } from "@/main";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const router = useRouter();
import { BookItem } from "@/types";
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.gif`;
};

const updateCart = function (book: BookItem, quantity: number) {
  cartStore.updateBookQuantity(book, quantity);
};
</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

.table-heading {
  background-color: #3d4045;
  color: white;
}

.table-heading > * {
  background-color: #3d4045;
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
}

.heading-price {
  grid-column: 3 / 4;
  text-align: right;
  padding: 0.5em 1em;
}

.heading-quantity {
  grid-column: 4 / 5;
  text-align: center;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
}

.cart-book-title {
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-price {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-quantity {
  padding-left: 1em;
  padding-right: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: start;
  justify-items: center;
}

.cart-book-subtotal {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 1px;
  background-color: #8080808f;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

.icon-button {
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
}

.icon-button:hover {
  color: var(--primary-color-dark);
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.cta-button {
  border-radius: 3px;
  border: 0;
  width: 100%;
}

.primary-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  width: 100%;
}

.checkout-button {
  grid-column: 1 / 6;
}

.clear-cart {
  grid-column: 4 / 6;
}

.clear-cart-button {
  background-color: firebrick;
}

.cart-subtotal {
  font-weight: bold;
}

.subtotal-container {
  grid-column: 5/ 6;
  margin: 1em auto;
  padding-right: 1em;
}

.continue-shopping-empty {
  margin: 1em auto;
  width: fit-content;
}

.empty-cart-message {
  text-align: center;
  margin: 5em auto;
}
</style>

<template>
  <div v-if="cartStore.count > 0" class="cart-table">
    <!--    <div class="cart-buttons-container">-->
    <div class="continue-shopping">
      <button
        class="button primary-button"
        @click="
          () => $router.push(`/category/${categoryStore.selectedCategory}`)
        "
      >
        Continue Shopping
      </button>
    </div>
    <div class="clear-cart">
      <button
        class="button primary-button clear-cart-button"
        @click="cartStore.clearCart()"
      >
        Clear Cart
      </button>
    </div>
    <!--    </div>-->
    <div class="checkout-button">
      <button
        class="button cta-button"
        @click="() => $router.push('/checkout')"
      >
        CHECKOUT
      </button>
    </div>
    <ul>
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price</div>
        <div class="heading-quantity">Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>
      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img
              :src="
                require('@/assets/images/books/' + bookImageFileName(item.book))
              "
              :alt="item.book.title"
              width="100px"
              height="auto"
            />
          </div>
          <div class="cart-book-title">{{ item.book.title }}</div>
          <div class="cart-book-price">
            {{ asDollarsAndCents(item.book.price) }}
          </div>
          <div class="cart-book-quantity">
            <button
              class="icon-button"
              @click="updateCart(item.book, item.quantity - 1)"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              class="icon-button"
              @click="updateCart(item.book, item.quantity + 1)"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="cart-book-subtotal">
            {{ asDollarsAndCents(item.book.price * item.quantity) }}
          </div>
        </li>
        <li class="line-sep"></li>
      </template>
    </ul>
    <div class="subtotal-container">
      <span class="cart-subtotal">Subtotal:</span>
      {{ asDollarsAndCents(cartStore.subtotal) }}
    </div>
  </div>
  <div v-else class="empty-cart-message">
    <h4>Your cart is empty.</h4>
    <div class="continue-shopping-empty">
      <button
        class="button primary-button"
        @click="
          () => $router.push(`/category/${categoryStore.selectedCategoryName}`)
        "
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>
