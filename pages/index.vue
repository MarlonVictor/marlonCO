<template>
  <Nav />
  <Hero />
  <TechCarousel />
  <Services />
</template>

<script setup>
import Hero from "../components/sections/Hero.vue";
import Nav from "../components/layout/Nav.vue";
import TechCarousel from "../components/sections/TechCarousel.vue";
import Services from "../components/sections/Services.vue";

useHead({
  title: "marlon.co",
});
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}
</style>
