<template>
  <div
    class="border border-[#ffffff15] rounded-xl flex-1 p-4 hidden md:flex flex-col gap-4"
  >
    <span class="text-offwhite-950 text-sm font-mono uppercase">
      Setup
    </span>

    <div class="flex flex-col gap-2 my-auto">
      <div
        v-for="s in SETUP"
        :key="s.label"
        class="flex flex-row flex-wrap justify-between items-baseline pb-2 border-b border-[#262626a4] last:!border-none"
      >
        <span
          class="text-xs !text-[.625rem] text-offwhite-950 uppercase tracking-wider opacity-90 font-medium -translate-y-0.5"
        >
          {{ s.label }}
        </span>
        <span class="text-sm text-offwhite-950 font-mono">
          {{ s.value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = useLocale();

const SETUP = [
  { label: data.value.about.setup[0], value: "Lenovo LOQ" },
  { label: data.value.about.setup[1], value: 'Dell 27" 4K IPS' },
  { label: data.value.about.setup[2], value: "Logitech K380" },
  { label: data.value.about.setup[3], value: "Logitech M650" },
];
</script>
