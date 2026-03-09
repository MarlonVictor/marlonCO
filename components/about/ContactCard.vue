<template>
  <div
    class="border border-[#ffffff15] rounded-xl col-span-2 h-[30rem] p-6 flex flex-col justify-between"
  >
    <div>
      <span className="text-offwhite-950 text-sm font-mono uppercase">
        {{ data.about.contact.subtitle }}
      </span>
      <h2
        class="text-offwhite-100 text-5xl !tracking-widest font-semibold mt-2 leading-[0.8]"
      >
        {{ data.about.contact.title.line_1 }} <br />
        {{ data.about.contact.title.line_2 }}
      </h2>

      <div className="flex items-center gap-2 mt-2 group" data-cursor-hover>
        <span class="text-offwhite-950 text-xs !tracking-wide">
          umarlonco@gmail.com
        </span>
        <Icon
          name="lucide:copy"
          size="12"
          class="text-offwhite-950 transition-colors group-hover:text-primary-500"
        />
      </div>
    </div>

    <div class="space-y-6">
      <ButtonAnimated
        :text="data.about.contact.cta"
        color="light"
        class="!rounded-md"
        sizeFull
      />

      <p className="text-xs text-offwhite-950 opacity-80">
        {{ data.about.contact.description.line_1 }} <br />
        {{ data.about.contact.description.line_2 }}
      </p>
    </div>
  </div>
</template>

<script setup>
import ButtonAnimated from "../ui/ButtonAnimated.vue";

const { data } = useLocale();
</script>
