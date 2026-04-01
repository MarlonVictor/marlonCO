<template>
  <div
    class="border border-[#ffffff15] rounded-xl md:flex-1 p-4 hidden md:flex flex-col gap-4"
  >
    <!-- Header -->
    <div>
      <span class="text-offwhite-950 text-sm font-mono uppercase">
        {{ data.about.beyond.subtitle }}
      </span>
      <h2 class="text-offwhite-100 text-3xl font-semibold mt-2 leading-[0.9]">
        {{ data.about.beyond.title.line_1 }} <br class="hidden md:block" />
        {{ data.about.beyond.title.line_2 }}
      </h2>
    </div>

    <!-- Links grid -->
    <div class="mt-auto grid grid-cols-3 gap-2">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center justify-center gap-2 aspect-square border border-gray-900 rounded-lg transition hover:bg-[#ffffff10] hover:-translate-y-1 group"
      >
        <Icon :name="link.icon" size="22" :style="{ color: link.color }" />
        <span class="font-mono text-[10px] tracking-wider text-offwhite-950 uppercase text-center leading-tight">
          {{ link.label }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
const { data } = useLocale();

const links = [
  {
    label: "Frostsail",
    url: "https://www.youtube.com/@frostsail_co",
    icon: "simple-icons:youtube",
    color: "#FF0000",
  },

];
</script>
