<template>
  <section id="about" class="py-10 md:pb-20">
    <ArrowText text="sobre" arrow-side="down" font-size="text-base" />

    <div class="grid grid-cols-7 mt-10 gap-2">
      <div class="hidden xl:flex flex-col gap-2 h-[30rem]">
        <BeyondCard />
        <SetupCard />
      </div>

      <LinksCard />
      <LocationCard />

      <div
        class="grid md:grid-cols-3 xl:hidden flex-col gap-2 md:h-[15rem] col-span-7"
      >
        <BeyondCard />
        <SetupCard />
        <ContactCard />
      </div>

      <AboutCard />
      <ContactCard class="hidden xl:flex" />

      <ToolsCard />
    </div>
  </section>
</template>

<script setup>
import ArrowText from "../ui/ArrowText.vue";
import LocationCard from "../about/LocationCard.vue";
import SetupCard from "../about/SetupCard.vue";
import ContactCard from "../about/ContactCard.vue";
import ToolsCard from "../about/ToolsCard.vue";
import BeyondCard from "../about/BeyondCard.vue";
import LinksCard from "../about/LinksCard.vue";
import AboutCard from "../about/AboutCard.vue";
</script>

<style scoped></style>
