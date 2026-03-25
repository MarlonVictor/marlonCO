<template>
  <section id="projects" class="pt-16 px-4 relative flex flex-col gap-8">
    <div class="flex items-end">
      <div class="inline-flex items-center gap-5 flex-1">
        <h2 class="text-6xl font-normal text-neutral-950 tracking-tight">
          Meus projetos
        </h2>

        <Icon name="lucide:arrow-down" class="size-10 translate-y-2" />
      </div>

      <NuxtLink to="/work" class="flex items-center gap-2 group">
        <span class="font-mono text-sm !tracking-wider">Todos projetos</span>
        <Icon
          name="lucide:arrow-right"
          class="size-4 transition-transform duration-300 group-hover:-rotate-45"
        />
      </NuxtLink>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        :to="`/work/${project.name}`"
        v-for="(project, index) in mainProjects"
        :key="index"
        class="w-full h-[39rem] rounded-lg overflow-hidden relative"
        :class="{
          'lg:col-span-2': index === 0,
          'hidden lg:block': index === 4,
        }"
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

<script setup>
const { data } = useLocale();

const mainProjects = computed(() => {
  return data.value.projects.project_list
    .filter((project) => project.main_order)
    .sort((a, b) => a.main_order - b.main_order);
});
</script>
