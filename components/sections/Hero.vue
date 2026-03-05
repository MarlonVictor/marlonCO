<template>
  <section class="h-screen p-4 flex relative">
    <SpaceBackground class="flex-1 rounded-2xl">
      <div
        class="flex flex-col items-center text-center lg:items-start lg:text-left justify-center p-8 h-full absolute -top-40 left-0 right-0 lg:relative lg:top-0"
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

        <!-- <div class="flex gap-3 mt-10 mb-8">
          <ButtonAnimated :text="data.hero.cta.primary.text" color="light" />
          <ButtonAnimated :text="data.hero.cta.secondary.text" color="dark" />
        </div> -->

        <div
          class="hidden lg:flex justify-between absolute left-8 right-8 bottom-8"
        >
          <div
            class="inline-flex gap-2 text-offwhite-950 leading-none tracking-tighter font-medium text-sm"
          >
            <span>{{ data.hero.scroll }}</span>
            <Icon name="lucide:arrow-down" size="16" />
          </div>

          <span
            class="text-offwhite-950 leading-none tracking-tighter font-medium text-sm"
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
</script>

<style scoped>
/* Adicione estilos específicos se necessário */
</style>
