<template>
  <div class="flex items-center gap-3">
    <span class="h-px w-8 bg-primary-500"></span>
    <span class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
      {{ text }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
