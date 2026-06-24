<template>
  <section id="home" class="h-screen p-2 md:p-4 flex relative">
    <SpaceBackground class="flex-1 rounded-2xl">
      <div
        class="hero-content flex flex-col items-center text-center lg:items-start lg:text-left justify-center p-8 h-full absolute -top-40 left-0 right-0 lg:relative lg:top-0"
        :class="{ 'hero-content--ready': canAnimate }"
      >
        <ArrowText :text="data.hero.name" />

        <h1
          class="bg-gradient-to-br dark:from-offwhite-300 from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-5xl font-medium tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-[5rem] pt-4 pb-8 md:max-w-[15ch]"
        >
          {{ data.hero.tagline }}
        </h1>

        <p class="text-offwhite-300 font-medium -mt-4 lg:mt-0">
          {{ data.hero.introduction.split("—").at(0) }} <br />
          {{ data.hero.introduction.split("—").at(1) }}
        </p>

        <div class="flex gap-3 mt-10 mb-8">
          <ButtonAnimated
            :text="data.hero.cta.primary.text"
            color="light"
            @click="() => $router.push('/work')"
          />
          <!-- <ButtonAnimated :text="data.hero.cta.secondary.text" color="dark" /> -->
        </div>

        <div
          class="hidden lg:flex justify-between absolute left-8 right-8 bottom-8"
        >
          <div
            class="inline-flex gap-2 text-offwhite-950 leading-none tracking-tighter font-semibold text-sm"
          >
            <span>{{ data.hero.scroll }}</span>
            <Icon name="lucide:arrow-down" size="16" />
          </div>

          <span
            class="text-offwhite-950 leading-none tracking-tighter font-semibold text-sm"
          >
            {{ data.hero.since }}
          </span>
        </div>
      </div>
    </SpaceBackground>
  </section>
</template>

<script setup>
import SpaceBackground from "../layout/SpaceBackground.vue";
import ArrowText from "../ui/ArrowText.vue";
import ButtonAnimated from "../ui/ButtonAnimated.vue";

const { data } = useLocale();
const { canAnimate } = useIntroSplash();
</script>

<style scoped>
.hero-content > :deep(*) {
  opacity: 0;
  transform: translateY(16px);
}

.hero-content--ready > :deep(*) {
  animation: hero-item-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-content--ready > :deep(*:nth-child(1)) {
  animation-delay: 0.05s;
}

.hero-content--ready > :deep(*:nth-child(2)) {
  animation-delay: 0.12s;
}

.hero-content--ready > :deep(*:nth-child(3)) {
  animation-delay: 0.19s;
}

.hero-content--ready > :deep(*:nth-child(4)) {
  animation-delay: 0.26s;
}

.hero-content--ready > :deep(*:nth-child(5)) {
  animation-delay: 0.33s;
}

@keyframes hero-item-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-content > :deep(*),
  .hero-content--ready > :deep(*) {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
