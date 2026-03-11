<template>
  <div
    class="border border-[#ffffff15] rounded-xl row-start-1 lg:row-start-auto col-span-7 lg:col-span-3 flex flex-col items-center justify-between p-4 h-[30rem] overflow-hidden relative"
    data-cursor-hover
    @mouseenter="isCardHovered = true"
    @mouseleave="isCardHovered = false"
  >
    <div class="py-8 flex flex-col items-center gap-2">
      <h2 class="text-offwhite-100 text-3xl text-center">
        {{ data.about.location.city_state }}
      </h2>

      <div class="flex flex-nowrap items-center gap-2">
        <div
          style="box-shadow: 0 0 7px #4ade80"
          class="size-2 rounded-full bg-[#4ade80] animate-pulse -translate-y-px"
        />
        <span class="text-offwhite-950 text-sm font-mono uppercase">
          {{ data.about.location.available }}
        </span>
      </div>
    </div>

    <GlobeCanvas />

    <div
      class="bg-[#262626a4] h-max px-3 py-1 rounded-full absolute bottom-4 right-4 text-offwhite-500 text-xs tracking-wider"
    >
      UTC-3
    </div>

    <Transition name="time-slide">
      <div
        v-if="isCardHovered"
        class="bg-[#262626a4] h-max px-3 py-1 rounded-full absolute bottom-4 left-4 text-offwhite-500 text-xs tracking-wider flex items-center gap-1"
      >
        {{ data.about.location.timer_text }}
        <Icon name="lucide:arrow-right" size="12" />
        {{
          now.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNow } from "@vueuse/core";
import GlobeCanvas from "../ui/GlobeCanvas.vue";

const { data } = useLocale();

const isCardHovered = ref(false);
const now = useNow();
</script>

<style scoped>
.time-slide-enter-active,
.time-slide-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}
.time-slide-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.time-slide-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.time-slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.time-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
