<template>
  <div
    data-cursor-hover
    class="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group tech-icon"
  >
    <!-- Ícone -->
    <Icon :name="icon" size="56" :class="color" class="relative z-10" />

    <!-- Nome da tecnologia (opcional - aparece no hover) -->
    <span
      class="text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
    >
      {{ name }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "text-gray-950",
  },
});
</script>

<style scoped>
.tech-icon {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tech-icon:hover {
  transform: scale(1.1) translateY(-5px);
}
</style>
