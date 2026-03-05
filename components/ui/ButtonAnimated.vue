<template>
  <button
    class="inline-flex items-center gap-2 py-3 px-5 hover:bg-primary-500 hover:text-offwhite-100 rounded-xl transition-all duration-300 group"
    :class="
      color === 'dark'
        ? 'bg-black text-offwhite-100'
        : 'bg-offwhite-300 text-gray-900'
    "
  >
    <span class="text-sm font-medium font-mono uppercase">
      {{ text }}
    </span>
    <Icon
      name="lucide:arrow-right"
      size="16"
      class="group-hover:-rotate-45 transition-all duration-300"
    />
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "light",
    validator(value) {
      return ["light", "dark"].includes(value);
    },
  },
});
</script>
