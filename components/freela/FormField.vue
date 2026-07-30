<template>
  <div>
    <label class="font-mono text-xs uppercase tracking-widest text-offwhite-950">
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="mt-3 w-full rounded-xl border border-offwhite-100/15 bg-transparent px-4 py-3 text-sm text-offwhite-100 outline-none transition-colors placeholder:text-offwhite-950/60 focus:border-primary-500"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>
