<template>
  <li
    class="list-none transition text-gray-700 hover:text-gray-100 hover:bg-primary-500 rounded-md"
  >
    <NuxtLink
      :to="`/work/${project.name}`"
      class="grid grid-cols-[1fr_1fr_100px] lg:grid-cols-[1fr_1fr_1fr_100px] items-center h-8 px-3"
    >
      <div class="flex items-center gap-2">
        <span
          class="h-5 w-1 rounded-lg block"
          :style="{ background: categoryColor }"
        />
        <span>{{ project.name }}</span>
      </div>
      <span>/ {{ categoryName }}</span>
      <span class="line-clamp-1 truncate hidden lg:block">{{
        project.tecnologies.slice(0, 3).join(", ")
      }}</span>
      <span class="text-right">/ {{ project.year || "—" }}</span>
    </NuxtLink>
  </li>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  project: { type: Object, required: true },
  categories: { type: Object, default: () => ({}) },
  subcategories: { type: Object, default: () => ({}) },
});

const categoryName = computed(() => {
  const cat = props.categories[props.project.category];
  return cat ? cat.name : props.project.category;
});

const categoryColor = computed(() => {
  const cat = props.categories[props.project.category];
  return cat?.color ?? "#999";
});
</script>
