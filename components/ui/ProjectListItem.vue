<template>
  <li
    class="list-none transition text-gray-700 hover:text-gray-100 hover:bg-primary-500 rounded-md"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @mousemove="onMove"
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

    <Teleport to="body">
      <div
        v-if="isHovered && project.image"
        class="project-image-preview"
        :style="{ transform: `translate3d(${imgX}px, ${imgY}px, 0)` }"
      >
        <img :src="project.image" :alt="project.name" />
      </div>
    </Teleport>
  </li>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCursor } from "~/composables/useCursor";

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

const { setForcedHidden } = useCursor();

const isHovered = ref(false);
const imgX = ref(0);
const imgY = ref(0);

function onEnter(e) {
  isHovered.value = true;
  setForcedHidden(true);
  imgX.value = e.clientX;
  imgY.value = e.clientY;
}

function onLeave() {
  isHovered.value = false;
  setForcedHidden(false);
}

function onMove(e) {
  imgX.value = e.clientX;
  imgY.value = e.clientY;
}
</script>

<style scoped>
.project-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  pointer-events: none;
  width: 280px;
  height: 180px;
  object-fit: cover;
  margin-left: -140px;
  margin-top: -120px;
  will-change: transform;
}

.project-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
