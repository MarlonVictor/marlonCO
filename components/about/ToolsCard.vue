<template>
  <div
    class="border border-[#ffffff15] rounded-xl h-[7.5rem] col-span-7 flex items-center py-4 px-6 gap-16"
  >
    <div className="text-xs !leading-[1.6]">
      <p class="text-offwhite-950 whitespace-nowrap uppercase font-mono">
        {{ data.about.tools.title }}
      </p>
      <p class="text-offwhite-950 opacity-80 whitespace-nowrap">
        {{ data.about.tools.subtitle }}
      </p>
    </div>

    <div class="relative !overflow-hidden">
      <div
        class="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"
      ></div>

      <ClientOnly>
        <Vue3Marquee
          :duration="30"
          :clone="true"
          :gap="64"
          class="py-6 !overflow-hidden"
        >
          <div
            v-for="tool in TOOLS"
            :key="tool.name"
            class="grid place-items-center size-14 rounded-xl border border-gray-900 mx-4"
          >
            <Icon
              :name="tool.icon"
              size="28"
              :class="tool.color"
              class="relative z-10"
            />
          </div>
        </Vue3Marquee>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";

const { data } = useLocale();

const TOOLS = [
  // Ambiente de desenvolvimento
  { icon: "simple-icons:visualstudiocode", color: "text-blue-500" },
  { icon: "simple-icons:cursor", color: "text-white" },
  { icon: "simple-icons:warp", color: "text-[#01A4FF]" },

  // Versionamento & IA de código
  { icon: "simple-icons:github", color: "text-white" },
  { icon: "simple-icons:githubcopilot", color: "text-offwhite-300" },

  // IA & Assistentes
  //   { icon: "simple-icons:openai", color: "text-offwhite-500" },
  { icon: "simple-icons:claude", color: "text-[#D97757]" },

  // Design
  { icon: "simple-icons:figma", color: "text-[#F24E1E]" },

  // Infra & Deploy
  { icon: "simple-icons:docker", color: "text-[#2496ED]" },
  { icon: "simple-icons:vercel", color: "text-white" },
  { icon: "simple-icons:supabase", color: "text-[#3FCF8E]" },

  // API & Testes
  { icon: "simple-icons:postman", color: "text-[#FF6C37]" },
  { icon: "simple-icons:vitest", color: "text-[#00FF74]" },

  // CMS & E-commerce
  { icon: "simple-icons:wordpress", color: "text-[#21759B]" },
  //   { icon: "simple-icons:shopify", color: "text-[#7AB55C]" },

  // Pagamentos
  //   { icon: "simple-icons:stripe", color: "text-[#4945FF]" },

  // Automação
  { icon: "simple-icons:n8n", color: "text-[#EA4B71]" },

  // Produtividade
  { icon: "simple-icons:notion", color: "text-white" },
];
</script>
