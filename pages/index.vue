<template>
  <Nav />
  <Hero />
  <TechCarousel />

  <div class="p-4">
    <div class="flex-1 bg-gray-950 rounded-2xl min-h-screen px-12">
      <Services />
      <About />
    </div>
  </div>
</template>

<script setup>
import Hero from "../components/sections/Hero.vue";
import Nav from "../components/layout/Nav.vue";
import TechCarousel from "../components/sections/TechCarousel.vue";
import Services from "../components/sections/Services.vue";
import About from "../components/sections/About.vue";

useHead({
  title: "MARLON.CO - Software Developer",
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
