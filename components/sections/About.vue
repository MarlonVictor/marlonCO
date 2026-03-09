<template>
  <section id="about" class="pt-10 pb-20">
    <ArrowText text="sobre" arrow-side="down" font-size="text-base" />

    <div class="grid grid-cols-7 mt-10 gap-2">
      <div class="flex flex-col gap-2 h-[30rem]">
        <BeyondCard />
        <SetupCard />
      </div>

      <LinksCard />
      <LocationCard />

      <AboutCard />
      <ContactCard />

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
