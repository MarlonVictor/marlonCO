<template>
  <!-- Desktop: só o contador circular (orientação, ref. Federico Pian). -->
  <div
    v-if="deck"
    data-trail-block
    class="fixed bottom-12 left-12 z-30 hidden lg:block"
    aria-hidden="true"
  >
    <div
      class="flex size-24 flex-col items-center justify-center gap-1 rounded-[1.75rem] border border-gray-950/20 bg-white/25 backdrop-blur-sm"
    >
      <span class="font-mono-code text-[9px] uppercase tracking-[0.3em] text-gray-700">
        case
      </span>
      <div class="flex items-baseline gap-1">
        <span class="text-3xl font-light leading-none tabular-nums text-gray-950">
          {{ String(index + 1).padStart(2, "0") }}
        </span>
        <span class="font-mono-code text-xs tabular-nums text-gray-600">
          /{{ String(total).padStart(2, "0") }}
        </span>
      </div>
      <div class="mt-1 flex gap-1.5" aria-hidden="true">
        <span
          v-for="i in total"
          :key="i"
          class="h-[2px] w-3 rounded-full transition-colors duration-300"
          :class="i - 1 === index ? 'bg-gray-950' : 'bg-gray-950/25'"
        />
      </div>
    </div>
  </div>

  <!-- Mobile: setas prev/next com o índice entre elas. -->
  <div class="fixed inset-x-0 bottom-6 z-30 flex items-center justify-center gap-6 lg:hidden">
    <button
      type="button"
      class="grid size-11 place-items-center rounded-full border border-gray-950/25 bg-white/50 text-gray-800 backdrop-blur transition-colors active:text-gray-950 disabled:opacity-30"
      :disabled="index === 0"
      aria-label="Case anterior"
      @click="$emit('prev')"
    >
      <Icon name="lucide:arrow-up" class="size-4" />
    </button>
    <span class="font-mono-code text-xs tabular-nums tracking-[0.25em] text-gray-800">
      {{ String(index + 1).padStart(2, "0") }} / {{ String(total).padStart(2, "0") }}
    </span>
    <button
      type="button"
      class="grid size-11 place-items-center rounded-full border border-gray-950/25 bg-white/50 text-gray-800 backdrop-blur transition-colors active:text-gray-950 disabled:opacity-30"
      :disabled="index === total - 1"
      aria-label="Próximo case"
      @click="$emit('next')"
    >
      <Icon name="lucide:arrow-down" class="size-4" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  deck: { type: Boolean, default: false },
});
defineEmits(["prev", "next"]);
</script>
