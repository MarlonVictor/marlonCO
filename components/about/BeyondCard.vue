<template>
  <div
    class="border border-[#ffffff15] rounded-xl md:flex-1 p-4 hidden md:flex flex-col"
  >
    <span class="text-offwhite-950 text-sm font-mono uppercase">
      {{ data.about.beyond.subtitle }}
    </span>
    <h2 class="text-offwhite-100 text-3xl font-semibold mt-2 leading-[0.9]">
      {{ data.about.beyond.title.line_1 }} <br class="hidden md:block" />
      {{ data.about.beyond.title.line_2 }}
    </h2>
    <div class="mt-4 md:mt-auto text-offwhite-950 text-xs font-mono uppercase">
      {{ data.about.beyond.description }}
    </div>
  </div>
</template>

<script setup>
const { data } = useLocale();
</script>
