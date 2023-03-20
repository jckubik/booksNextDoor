<script setup lang="ts"></script>

<style scoped>
.home-page {
  display: flex;
  flex: 7;
}

.hero-img-and-cta {
  background-image: url("@/assets/images/site/welcome-hero.jpg");
  background-size: cover;
  width: 100%;
  height: 70vh;
  display: flex;
}

.welcome-text {
  width: 20em;
}

.cta-button {
  border-radius: 3px;
  border: 0;
  margin: 1em;
}

#cta-container {
  width: 15em;
  height: 18em;
  border: 1px solid var(--primary-color-dark);
  border-radius: 10px;
  background-color: var(--card-background-color);
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

#cta-text {
  font-family: var(--title-font-family);
  font-size: var(--font-size-md);
  letter-spacing: var(--title-letter-spacing);
  display: flex;
  margin: auto;
}

#cta-text > img {
  width: 120px;
  margin: 0 0 0 0.5em;
}
</style>
<template>
  <div class="home-page">
    <section class="hero-img-and-cta">
      <div id="cta-container">
        <div id="cta-text">
          <img
            src="@/assets/images/site/bookstore-logo.png"
            alt="The Books Next Door logo."
            width="120px"
            height="auto"
          />
          <h2>The Books Next Door</h2>
        </div>
        <button
          class="button cta-button"
          @click="() => $router.push('/category/New Books')"
        >
          FIND YOUR NEXT BOOK
        </button>
      </div>
    </section>
  </div>
</template>
