<template>
  <button
    class="inline-flex items-center gap-2 py-3 px-5 rounded-xl transition-all duration-300 group"
    :class="[variants[color], sizeFull && 'w-full justify-between']"
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

<!-- Escopo de módulo: o defineProps é içado para fora do setup(), então o
     validator só enxerga o que estiver declarado fora do <script setup>. -->
<script>
// Cada variante carrega o próprio hover: no "primary" o laranja já é o estado
// de repouso, então o hover precisa inverter em vez de repetir a mesma cor.
export const variants = {
  light: "bg-offwhite-300 text-gray-900 hover:bg-primary-500 hover:text-offwhite-100",
  dark: "bg-black text-offwhite-100 hover:bg-primary-500 hover:text-offwhite-100",
  primary: "bg-primary-500 text-offwhite-100 hover:bg-offwhite-100 hover:text-gray-900",
};
</script>

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
      return Object.keys(variants).includes(value);
    },
  },
  sizeFull: {
    type: Boolean,
    default: false,
  }
});
</script>
