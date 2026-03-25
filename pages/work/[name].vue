<template>
  <Nav />

  <section v-if="project" class="min-h-screen px-9 lg:px-36">
    <div
      class="pt-[12rem] pb-20 xl:pb-28 flex flex-col xl:flex-row justify-between gap-8"
    >
      <div class="flex flex-col gap-5 xl:gap-10">
        <div class="flex flex-col gap-5">
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/work"
              class="text-sm text-gray-700 hover:text-gray-950 transition-colors group"
            >
              <Icon
                name="lucide:arrow-left"
                size="24"
                class="transition-transform duration-300 group-hover:-rotate-45"
              />
            </NuxtLink>

            <h1 class="text-6xl text-neutral-950">{{ project.name }}</h1>
          </div>
          <p
            class="text-offwhite-950 xl:max-w-[33rem] text-justify leading-tight"
          >
            {{ project.description }}
          </p>
        </div>

        <ul v-if="project.tecnologies.length" class="flex gap-2">
          <li
            v-for="(tech, index) in project.tecnologies"
            :key="index"
            class="h-6 px-2 grid place-items-center rounded bg-offwhite-500/60 text-xs text-neutral-950 tracking-tight"
          >
            {{ tech }}
          </li>
        </ul>
      </div>

      <ul class="xl:max-w-[33rem] w-full mt-auto text-neutral-950 text-sm">
        <li class="flex gap-2 border-b border-neutral-950 py-3">
          <span class="flex-1">
            {{ project.client && data.projects.project_stats.client }}
            {{ project.event && data.projects.project_stats.event }}
          </span>
          <span>{{ project.client || project.event }}</span>
        </li>
        <li class="flex gap-2 border-b border-neutral-950 py-3">
          <span class="flex-1">{{ data.projects.project_stats.year }}</span>
          <span>{{ project.year || "—" }}</span>
        </li>
        <li class="flex gap-2 border-b border-neutral-950 py-3">
          <a
            v-if="project.link_github"
            :href="project.link_github"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-neutral-600 transition-colors"
          >
            Github Link
          </a>
          <a
            v-if="project.link_live"
            :href="project.link_live"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-500 hover:text-neutral-600 hover:underline transition ml-auto truncate max-w-[30ch]"
          >
            {{ project.link_live?.replace("https://", "") }}
          </a>
        </li>
      </ul>
    </div>

    <div class="grid place-items-center">
      <img
        v-if="project.image"
        :src="getImageUrl(project.image)"
        alt="Project Image"
        class="w-full rounded-2xl max-h-[80vh] object-cover"
        :style="{ objectPosition: imagePosition }"
      />
    </div>

    <div class="grid xl:grid-cols-2 gap-8 my-20 xl:my-28">
      <h1 class="text-4xl text-neutral-950">{{ project.title }}</h1>

      <div
        v-if="project.full_description"
        class="text-offwhite-950 text-justify leading-tight space-y-4"
        v-html="project.full_description"
      />
    </div>

    <div class="grid lg:grid-cols-2 gap-8 my-20 xl:my-28">
      <NuxtLink
        :to="`/work/${project.name}`"
        v-for="(project, index) in nextProjects"
        :key="index"
        class="w-full h-[18rem] lg:h-[39rem] rounded-lg overflow-hidden relative"
      >
        <img
          :src="project.image"
          :alt="project.name"
          class="w-full h-full object-cover"
        />

        <div
          class="p-8 space-y-4 absolute bottom-0 left-0 right-0 z-10 text-lg text-white bg-gradient-to-t from-black/80 to-transparent"
        >
          <h4>{{ project.name }}</h4>
          <div class="flex gap-3">
            <span
              v-for="(tech, techIndex) in project.tecnologies.slice(0, 3)"
              :key="techIndex"
              class="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm truncate line-clamp-1"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useLocale } from "../../composables/useLocale";
import Nav from "../../components/layout/Nav.vue";
import { useHead } from "nuxt/app";

const route = useRoute();
const { data } = useLocale();

// Monitor window size
const windowWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1280,
);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Get the project name from the URL parameter
const projectName = computed(() => {
  return (route.params.name as string) || "";
});

// Find the project in the project list
const project = computed(() => {
  if (!projectName.value) return null;

  return data.value.projects.project_list.find(
    (p: any) => p.name.toLowerCase() === projectName.value.toLowerCase(),
  );
});

// Get the index of the current project
const currentProjectIndex = computed(() => {
  if (!project.value) return -1;

  return data.value.projects.project_list.findIndex(
    (p: any) => p.name.toLowerCase() === projectName.value.toLowerCase(),
  );
});

// Get next two projects (or first two if at the end)
const nextProjects = computed(() => {
  const projectList = data.value.projects.project_list;
  const currentIndex = currentProjectIndex.value;

  if (currentIndex === -1) return [];

  const listLength = projectList.length;
  const nextIndex = (currentIndex + 1) % listLength;
  const secondNextIndex = (currentIndex + 2) % listLength;

  return [projectList[nextIndex], projectList[secondNextIndex]];
});

// Get image position based on screen size
const imagePosition = computed(() => {
  // Force center for screens smaller than 1280px (xl breakpoint)
  if (windowWidth.value < 1280) {
    return "center";
  }
  return project.value?.image_position || "center";
});

// Caminho das imagens é servido diretamente de public/
function getImageUrl(imagePath: string): string {
  // O caminho já vem como /assets/images/... e funciona agora
  // pois está em public/assets/images/...
  return imagePath;
}

watch(
  () => project.value,
  (newProject) => {
    if (newProject) {
      useHead({
        title: `MARLON.CO - ${newProject.name}`,
      });
    }
  },
  { immediate: true },
);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
