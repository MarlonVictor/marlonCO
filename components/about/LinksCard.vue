<template>
  <div
    class="border border-[#ffffff15] rounded-xl md:h-[30rem] p-6 col-span-7 lg:col-span-4 xl:col-span-3 flex flex-col gap-8 justify-between"
  >
    <div class="flex justify-between items-start">
      <h2 class="text-offwhite-100 text-3xl font-semibold mt-2 leading-[0.9]">
        {{ data.about.links.title.line_1 }} <br class="hidden md:block" />
        {{ data.about.links.title.line_2 }}
      </h2>

      <span
        class="text-offwhite-950 uppercase font-mono text-xs hidden md:flex items-center gap-1 !tracking-wider"
      >
        ( Links )
        <Icon name="lucide:arrow-down" size="16" class="" />
      </span>
    </div>

    <!-- LINKS -->
    <div class="flex flex-col md:flex-row gap-3">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.url"
        :target="link.url.startsWith('http') ? '_blank' : '_self'"
        rel="noopener noreferrer"
        class="flex-1 flex flex-row md:flex-col items-center md:justify-center gap-4 py-2 md:py-4 px-3 border border-gray-900 rounded-md transition hover:bg-[#ffffff10] hover:-translate-y-1 group"
        :class="{ 'pointer-events-none opacity-50': link.disabled }"
      >
        <!-- <component :is="link.icon" /> -->
        <Icon
          :name="link.icon"
          size="28"
          :class="link.color"
          class="relative z-10"
        />
        <span
          class="font-mono text-xs tracking-wider text-offwhite-950 uppercase text-center"
        >
          {{ link.label }}
        </span>

        <Icon
          name="lucide:arrow-right"
          size="16"
          class="text-offwhite-950 ml-auto group-hover:text-offwhite-100 transition md:hidden"
        />
      </a>
    </div>

    <!-- GITHUB ACTIVITY -->
    <div class="hidden md:flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:github"
          size="20"
          class="text-gray-300 -translate-y-px shrink-0"
        />

        <p class="text-offwhite-950 whitespace-nowrap uppercase font-mono">
          {{ data.about.links.github.title }}
        </p>

        <span class="block h-px w-full bg-gray-900 ml-4" />
      </div>

      <div>
        <!-- contribution grid -->
        <div class="flex">
          <div
            v-for="(week, wi) in contributionGrid"
            :key="wi"
            class="flex-1 min-w-0 flex flex-col mx-[2px]"
          >
            <div
              v-for="(cell, di) in week"
              :key="di"
              class="day-cell w-full aspect-square rounded-sm relative transition my-[2px] hover:scale-125 hover:z-10"
              :class="`l${cell.level}`"
            />
          </div>
        </div>

        <!-- footer -->
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs text-offwhite-950">
            <strong class="text-primary-500 mr-1">
              {{ totalContributions.toLocaleString("pt-BR") }}
            </strong>
            <strong class="tracking-wider">
              {{ data.about.links.github.contribution }}
            </strong>
          </span>

          <div class="flex items-center gap-2">
            <strong class="text-xs text-offwhite-950">Less</strong>
            <div class="flex gap-1">
              <div
                v-for="l in [0, 1, 2, 3, 4]"
                :key="l"
                class="size-4 rounded-sm"
                :class="`l${l}`"
              />
            </div>
            <strong class="text-xs text-offwhite-950">More</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const { data } = useLocale();

// ── Props ────────────────────────────────────────────────
const props = defineProps({
  githubUser: {
    type: String,
    default: "MarlonVictor",
  },
});

// ── Links config — edite as URLs aqui ───────────────────
const links = [
  {
    label: data.value.about.links.link_list[0],
    url: `https://github.com/${props.githubUser}`,
    icon: "simple-icons:github",
    color: "text-white",
  },
  {
    label: data.value.about.links.link_list[1],
    url: "#",
    icon: "simple-icons:linkedin",
    color: "text-[#0966C3]",
  },
  {
    label: "Buy me a Coffee",
    url: "https://buymeacoffee.com/marlonco",
    icon: "simple-icons:buymeacoffee",
    color: "text-[#FFDD00]",
  },
  {
    label: data.value.about.links.link_list[3],
    url: "work?type=extension",
    icon: "simple-icons:chromewebstore",
    color: "text-[#4285F4]",
  },
  { 
    label: data.value.about.links.link_list[2], 
    url: "#", 
    icon: "simple-icons:wordpress", 
    color: "text-[#21759B]", 
    disabled: true 
  },
  // {
  //   label: data.value.about.links.link_list[4],
  //   url: "#",
  //   icon: "lucide:file-user",
  //   color: "text-primary-500",
  //   disabled: true,
  // },
];

// ── Contribution grid (API real) ────────────────────────
const contributionMap = ref(new Map());
const totalContributions = ref(0);

onMounted(async () => {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${props.githubUser}`,
  );
  const data = await res.json();
  const map = new Map();
  for (const c of data.contributions ?? []) {
    map.set(c.date, c);
  }
  contributionMap.value = map;
});

function pad(n) {
  return String(n).padStart(2, "0");
}

function dateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const contributionGrid = computed(() => {
  if (!contributionMap.value.size) return [];

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  // Align to the previous Sunday so each column is a full week
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  const cursor = new Date(start);
  let total = 0;

  while (cursor <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      if (cursor > today) break;
      const key = dateKey(cursor);
      const entry = contributionMap.value.get(key);
      const count = entry?.count ?? 0;
      const level = entry?.level ?? 0;
      total += count;
      week.push({ level });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  totalContributions.value = total;
  return weeks;
});
</script>

<style scoped>
.l0 {
  background: #ffffff15;
}
.l1 {
  background: #ffffff30;
}
.l2 {
  background: #ffffff45;
}
.l3 {
  background: #ffffff55;
}
.l4 {
  background: #ffffff65;
}
</style>
