<template>
  <div
    class="inline-flex gap-2"
    :class="color === 'light' ? 'text-offwhite-950' : 'text-gray-950'"
  >
    <h3
      :class="[
        font === 'mono' ? 'inline-flex font-mono' : 'inline-flex',
        fontSize,
      ]"
      class="leading-none font-medium uppercase"
    >
      <span class="block mr-2">(</span>
      {{ text }}
      <span class="block ml-2">)</span>
    </h3>

    <Icon
      :name="`lucide:arrow-${arrowSide}`"
      :size="iconSizes[fontSize]"
      class="-translate-y-[.125rem]"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

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
  fontSize: {
    type: String,
    default: "text-sm",
    validator: (value) => ["text-sm", "text-base", "text-lg"].includes(value),
  },
});

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const iconSizes = computed(() => ({
  "text-sm": isSmallScreen.value ? 14 : 16,
  "text-base": isSmallScreen.value ? 16 : 18,
  "text-lg": isSmallScreen.value ? 18 : 20,
}));
</script>

<style scoped>
@media (max-width: 1024px) {
  h3.text-sm {
    font-size: 0.75rem; /* 12px */
  }
  h3.text-base {
    font-size: 0.875rem; /* 14px */
  }
  h3.text-lg {
    font-size: 1rem; /* 16px */
  }
}
</style>
