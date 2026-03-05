<template>
  <div
    class="inline-flex gap-2"
    :class="color === 'light' ? 'text-offwhite-950' : 'text-gray-950'"
  >
    <h3
      :class="font === 'mono' ? 'inline-flex font-mono' : 'inline-flex'"
      class="leading-none font-medium text-sm uppercase"
    >
      <span class="block mr-2">(</span>
      {{ text }}
      <span class="block ml-2">)</span>
    </h3>

    <Icon
      :name="`lucide:arrow-${arrowSide}`"
      size="16"
      class="-translate-y-0.5"
    />
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  arrowSide: {
    type: String,
    default: "right",
    validator: (value) => ["right", "left", "down", "up"].includes(value),
  },
  color: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  font: {
    type: String,
    default: "mono",
    validator: (value) => ["mono", "normal"].includes(value),
  },
});
</script>
