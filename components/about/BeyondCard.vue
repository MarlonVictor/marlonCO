<template>
  <div class="border border-[#ffffff15] rounded-xl flex-1 p-4 flex flex-col">
    <span className="text-offwhite-950 text-sm font-mono uppercase">
      {{ data.about.beyond.subtitle }}
    </span>
    <h2
      class="text-offwhite-100 text-3xl font-semibold mt-2 leading-[0.9]"
    >
      {{ data.about.beyond.title.line_1 }} <br />
      {{ data.about.beyond.title.line_2 }}
    </h2>
    <div class="mt-auto text-offwhite-950 text-xs font-mono uppercase">
      {{ data.about.beyond.description }}
    </div>
  </div>
</template>

<script setup>
const { data } = useLocale();
</script>
