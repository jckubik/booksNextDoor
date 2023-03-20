<script setup lang="ts">
import HeaderDropdown from "@/components/HeaderDropdown.vue";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();
</script>

<style scoped>
header {
  background: var(--primary-background-color);
  display: flex;
  padding: 1em;
  gap: 4em;
}

.bookstore-logos {
  display: flex;
  flex: 1;
  align-items: flex-end;
}

.search-bar-and-categories {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 0.2em;
  justify-content: center;
}

.text-logo {
  color: var(--primary-color-dark);
  font-family: var(--title-font-family);
  font-weight: 600;
  font-style: normal;
  letter-spacing: var(--title-letter-spacing);
  font-size: var(--font-size-lg);
}

.text-logo-link {
  text-decoration: none;
}

.text-logo-link:hover,
.text-logo-link:visited {
  color: var(--primary-color-dark);
}

.search-bar {
  text-align: center;
  padding: 0.5em;
  border: 3px solid var(--primary-color);
  border-radius: 9px;
}

.header-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
}

.user-and-cart {
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
  align-items: center;
  gap: 0.2em;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}

#text-logo-container {
  display: flex;
  align-items: flex-end;
  padding: 0 0 0.5em 0;
}

#search-container {
  display: flex;
  align-items: center;
}

#bookstore-logo {
  width: 80px;
}

.button:hover {
  background: darkslategrey;
}
</style>

<template>
  <header class="container">
    <section class="bookstore-logos">
      <router-link to="/">
        <img
          src="@/assets/images/site/bookstore-logo.png"
          alt="The Books Next Door logo."
          id="bookstore-logo"
          width="80px"
          height="auto"
        />
      </router-link>
      <div id="text-logo-container">
        <router-link to="/" class="text-logo-link">
          <h1 class="text-logo">The Books Next Door</h1>
        </router-link>
      </div>
    </section>

    <section class="search-bar-and-categories">
      <div id="search-container">
        <form action="category.html">
          <input
            type="text"
            class="search-bar fa"
            placeholder="&#xf002; Search"
          /><br />
          <!-- <input type="submit" class="button search-button" value="Search" /> -->
        </form>
      </div>
    </section>

    <section class="user-and-cart">
      <header-dropdown></header-dropdown>
      <button class="button header-button">
        <i class="fa-solid fa-user"></i> JK
      </button>
      <router-link to="/cart">
        <button class="button header-button">
          <i class="fa-solid fa-bag-shopping"></i> ({{ cartStore.count }})
        </button>
      </router-link>
    </section>
  </header>
</template>
