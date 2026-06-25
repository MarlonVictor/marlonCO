<template>
  <slot />
</template>

<script setup>
const emit = defineEmits(["ready"]);

onMounted(() => {
  requestAnimationFrame(() => emit("ready"));
});
</script>
