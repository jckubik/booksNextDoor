<script setup lang="ts"></script>

<style scoped>
footer {
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.links,
.social-media-icons {
  display: flex;
  flex: 1;
  gap: 0.5em;
}

.links {
  justify-content: center;
}

.links > a {
  color: white;
}

.copyright {
  color: white;
  flex: 1;
}

.social-media-icons {
  text-align: center;
  gap: 0.25em;
  flex: 1;
  flex-direction: row-reverse;
}

.social-icons {
  font-size: 40px;
  color: white;
}

.social-icons:hover {
  color: darkslategrey;
}
</style>

<template>
  <footer class="container">
    <section class="copyright">
      <p><i class="fa-regular fa-copyright"></i> All Rights Reserved 2022</p>
    </section>
    <section class="links">
      <!--      <router-link to="/">about</router-link>-->
      <router-link to="/">Contact</router-link>
      <router-link to="/">Directions</router-link>
    </section>
    <section class="social-media-icons">
      <router-link to="/">
        <i class="fa-brands fa-square-facebook social-icons"></i>
      </router-link>
      <router-link to="/">
        <i class="fa-brands fa-square-twitter social-icons"></i>
      </router-link>
    </section>
  </footer>
</template>
