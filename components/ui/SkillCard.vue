<template>
  <div
    class="p-6 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-all hover:scale-105"
  >
    <Icon :name="icon" size="40" :class="color" class="mb-3" />
    <h3 class="font-medium">{{ name }}</h3>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  icon: String,
  color: String,
});
</script>
