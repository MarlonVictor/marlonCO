<template>
  <div
    v-if="isMobileScreen || (!isSmallScreen && !hasCardActive)"
    data-cursor-hover
    class="card border border-[#262626a4] rounded-lg flex flex-col overflow-hidden relative h-[32rem] group flex-1"
  >
    <div
      class="flex-1 relative overflow-hidden flex items-center justify-center"
    >
      <slot name="animation">
        <!-- Animação -->
      </slot>
    </div>
    <div
      class="pb-7 px-8 text-offwhite-100 !font-medium !tracking-wide leading-[1.2] transition sm:group-hover:text-primary-500"
    >
      <slot name="title">Title</slot>
    </div>
  </div>

  <div
    v-else
    class="card border border-[#262626a4] rounded-lg overflow-hidden relative h-[32rem] flex group"
    :class="isActive ? 'flex-1' : 'w-20'"
  >
    <div
      v-if="!isActive"
      class="text-offwhite-100 !font-medium !tracking-wide leading-[1.2] flex flex-col justify-end h-full w-full transition group-hover:text-primary-500"
    >
      <p class="-rotate-90 mb-20 whitespace-nowrap">
        {{ title }}
      </p>
    </div>

    <div
      v-else
      class="flex-1 relative overflow-hidden flex justify-between items-center"
    >
      <div class="flex-1 px-8 lg:max-w-[44rem]">
        <h2 class="text-offwhite-100 font-medium text-lg">{{ title }}</h2>

        <p class="mt-2 text-offwhite-950 text-xs lg:text-sm leading-tight">
          {{ description }}
        </p>

        <ul class="grid grid-cols-2 mt-8 gap-x-2 gap-y-1 max-w-[38rem]">
          <li
            v-for="(stat, index) in stats"
            :key="index"
            class="flex gap-1 items-center text-offwhite-950 text-xs"
          >
            <Icon name="lucide:arrow-right" :size="12" />
            {{ stat }}
          </li>
        </ul>
      </div>
      <div
        class="ml-auto hidden lg:block scale-75 xl:scale-125 xl:pr-32 xl:pl-20"
      >
        <slot name="animation">
          <!-- Animação -->
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  hasCardActive: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Title",
  },
  description: {
    type: String,
    default: "Description",
  },
  stats: {
    type: Array,
    default: () => [],
  },
  isSmallScreen: {
    type: Boolean,
    required: true,
  },
  isMobileScreen: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="css" scoped>
.card::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}
.card:hover {
  background: var(--card-hover);
  border-color: #2a2a2a;
}
.card:hover::after {
  opacity: 1;
}
</style>
