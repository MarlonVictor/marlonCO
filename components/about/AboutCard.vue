<template>
  <div
    class="border border-[#ffffff15] rounded-xl md:h-[30rem] col-span-7 xl:col-span-5 p-4 flex"
  >
    <div
      class="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 rounded-xl overflow-hidden"
    >
      <div
        class="relative flex h-[20rem] md:h-[28rem] w-full md:max-w-[25rem] p-4"
      >
        <img
          :src="avatar"
          class="absolute inset-0 size-full object-cover rounded-xl md:rounded-none"
        />

        <span
          class="blocl absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#00000090] to-transparent"
        />

        <div class="flex flex-col gap-1 mt-auto">
          <h2 class="text-offwhite-100 text-2xl md:text-3xl z-10">
            Marlon Coimbra
          </h2>

          <span
            class="text-offwhite-950 text-xs md:text-sm font-mono uppercase"
          >
            {{ data.about.about_me.role }} •
            <span class="tracking-wider">MARLON.CO</span>
          </span>
        </div>
      </div>

      <div
        class="relative flex flex-col gap-6 md:gap-8 flex-1 items-start justify-center py-2 md:py-8"
      >
        <h2 class="text-offwhite-100 text-2xl md:text-3xl z-10">
          {{ data.about.about_me.title }}
        </h2>

        <p class="text-xs text-offwhite-100">
          {{ data.about.about_me.description.line_1 }}
          <br /><br />
          {{ data.about.about_me.description.line_2 }}
          <br /><br />
          {{ data.about.about_me.description.line_3 }}
        </p>

        <img :src="iconSimple" class="size-4" />

        <a
          @click="openContactPopup"
          class="text-offwhite-950 text-xs !tracking-wide hidden lg:flex gap-1 items-center group mt-auto"
        >
          {{ data.about.about_me.cta }}
          <Icon
            name="lucide:arrow-right"
            size="12"
            class="transition-transform duration-300 group-hover:-rotate-45"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import avatar from "~/assets/images/avatar.webp";
import iconSimple from "~/assets/images/icon-simple.webp";

const { data } = useLocale();
const openContactPopup = inject("openContactPopup");
</script>
