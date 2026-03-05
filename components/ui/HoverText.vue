<template>
  <span
    class="relative inline-flex overflow-hidden"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- White text (default) -->
    <span
      class="inline-block transition-transform duration-300 ease-out"
      :class="textClass"
      :style="{
        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
      }"
    >
      {{ text }}
    </span>

    <!-- Primary text (on hover) -->
    <span
      class="absolute inset-0 inline-block transition-transform duration-300 ease-out text-primary-500"
      :style="{
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
      }"
    >
      {{ text }}
    </span>
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  textClass: {
    type: String,
    default: "text-offwhite-100",
  },
});

const isHovered = ref(false);
</script>
