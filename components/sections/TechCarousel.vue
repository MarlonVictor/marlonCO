<template>
  <div class="w-full pt-14 space-y-8">
    <ArrowText :text="data.technologies.title" arrow-side="down" class="pl-4" />

    <div class="relative !overflow-hidden">
      <!-- Gradientes nas bordas para efeito fade -->
      <div
        class="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-offwhite-300 to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-offwhite-300 to-transparent z-10 pointer-events-none"
      ></div>

      <!-- Carrossel infinito com vue3-marquee -->
      <ClientOnly>
        <Vue3Marquee
          :duration="30"
          :pause-on-hover="true"
          :clone="true"
          :gap="64"
          class="py-6 !overflow-hidden"
        >
          <TechIcon
            v-for="tech in technologies"
            :key="tech.name"
            :name="tech.name"
            :icon="tech.icon"
            class="mx-8"
          />
        </Vue3Marquee>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";
import TechIcon from "../ui/TechIcon.vue";
import ArrowText from "../ui/ArrowText.vue";
const { data } = useLocale();

const technologies = [
  {
    name: "HTML5",
    icon: "simple-icons:html5",
  },
  {
    name: "CSS",
    icon: "simple-icons:css",
  },
  {
    name: "Tailwind CSS",
    icon: "simple-icons:tailwindcss",
  },
  {
    name: "JavaScript",
    icon: "simple-icons:javascript",
  },
  {
    name: "TypeScript",
    icon: "simple-icons:typescript",
  },
  { name: "Vue.js", icon: "simple-icons:vuedotjs" },
  { name: "Nuxt", icon: "simple-icons:nuxtdotjs" },
  {
    name: "Quasar Framework",
    icon: "simple-icons:quasar",
  },
  { name: "React", icon: "simple-icons:react" },

  { name: "Node.js", icon: "simple-icons:nodedotjs" },
  { name: "MongoDB", icon: "simple-icons:mongodb" },
  { name: "Prisma ORM", icon: "simple-icons:prisma" },
];
</script>

<style scoped></style>
