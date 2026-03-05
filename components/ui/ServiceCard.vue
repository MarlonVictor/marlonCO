<template>
  <div
    data-cursor-hover
    class="card border border-[#262626a4] rounded-lg flex flex-col overflow-hidden relative"
  >
    <div
      class="flex-1 min-h-[28rem] relative overflow-hidden flex items-center justify-center"
    >
      <slot name="animation">
        <!-- Animação -->
      </slot>
    </div>
    <div class="pb-7 px-8 flex justify-between">
      <div class="text-offwhite-100 !font-medium !tracking-wide leading-[1.2]">
        <slot name="title">Title</slot>
      </div>
      <!-- <div class="text-primary-500">↗</div> -->
    </div>
  </div>
</template>

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
