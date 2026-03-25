<template>
  <section id="services" class="py-10 md:py-20">
    <ArrowText
      :text="data.services.title"
      arrow-side="down"
      font-size="text-base"
    />

    <div class="mt-4 lg:mt-8 flex flex-col gap-4">
      <h1 class="text-4xl lg:text-5xl font-normal text-offwhite-100">
        {{ data.services.tagline }}
      </h1>
      <p
        class="text-xs lg:text-sm leading-tight text-offwhite-950 max-w-[32.5rem] text-justify"
      >
        {{ data.services.introduction }}
      </p>
    </div>

    <!-- Desktop / Tablet -->
    <div v-if="!isMobileScreen" class="flex gap-2 overflow-hidden mt-16">
      <ServiceCard
        v-for="(card, i) in cardsData"
        :key="i"
        v-bind="card"
        @click="() => !isSmallScreen && (cardActiveIndex = i)"
        :isActive="cardActiveIndex === i"
        :isSmallScreen="isSmallScreen"
        :isMobileScreen="isMobileScreen"
        :hasCardActive="hasCardActive"
      >
        <template #animation>
          <component :is="animComponents[i]" />
        </template>
        <template #title>
          {{ data.services.items[i].name_line_1 }}<br />
          {{ data.services.items[i].name_line_2 }}
        </template>
      </ServiceCard>
    </div>

    <!-- Mobile Infinite Drag Carousel -->
    <div v-else ref="carouselRef" class="mt-16 overflow-hidden">
      <div
        class="flex will-change-transform select-none"
        :class="{
          'transition-transform duration-300 ease-out':
            isTransitionEnabled && !isDragging,
        }"
        :style="{ transform: `translateX(${trackX}px)`, touchAction: 'none' }"
        @pointerdown="onDragStart"
        @pointermove="onDragMove"
        @pointerup="onDragEnd"
        @pointercancel="onDragEnd"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(cardIdx, pos) in carouselOrder"
          :key="`s${pos}`"
          class="flex-shrink-0 w-full"
        >
          <ServiceCard
            v-bind="cardsData[cardIdx]"
            :isActive="false"
            :isSmallScreen="false"
            :isMobileScreen="true"
            :hasCardActive="false"
          >
            <template #animation>
              <component :is="animComponents[cardIdx]" />
            </template>
            <template #title>
              {{ data.services.items[cardIdx].name_line_1 }}<br />
              {{ data.services.items[cardIdx].name_line_2 }}
            </template>
          </ServiceCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import ArrowText from "../ui/ArrowText.vue";
import ServiceCard from "../service/ServiceCard.vue";
import ServiceAnimEditor from "../service/ServiceAnimEditor.vue";
import ServiceAnimRender from "../service/ServiceAnimRender.vue";
import ServiceAnimDesign from "../service/ServiceAnimDesign.vue";

const { data } = useLocale();

const animComponents = [
  ServiceAnimEditor,
  ServiceAnimRender,
  ServiceAnimDesign,
];

const cardActiveIndex = ref(null);
const hasCardActive = computed(() => cardActiveIndex.value !== null);
const cardsData = computed(() =>
  data.value.services.items.map((item) => ({
    title: item.title,
    description: item.description,
    stats: item.stats,
  })),
);

// ─── Carousel (mobile < 640px) ───────────────────────────────────
const carouselRef = ref(null);
const carouselOrder = [2, 0, 1, 2, 0]; // cloneLast, c0, c1, c2, cloneFirst
const carouselPos = ref(1); // start at real first card (index 1 in carouselOrder)
const isDragging = ref(false);
const isTransitionEnabled = ref(true);
const dragOffset = ref(0);
let carouselStartX = 0;
let autoPlayInterval = null;
const AUTOPLAY_DELAY = 6000; // 6 segundos

const carouselWidth = computed(() => carouselRef.value?.offsetWidth ?? 0);
const trackX = computed(
  () => -(carouselPos.value * carouselWidth.value) + dragOffset.value + 1,
);

const startAutoPlay = () => {
  if (autoPlayInterval) return;
  autoPlayInterval = setInterval(() => {
    carouselPos.value = Math.min(carouselPos.value + 1, 4);
  }, AUTOPLAY_DELAY);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

const onDragStart = (e) => {
  stopAutoPlay();
  isDragging.value = true;
  carouselStartX = e.clientX;
  e.currentTarget.setPointerCapture(e.pointerId);
};

const onDragMove = (e) => {
  if (!isDragging.value) return;
  dragOffset.value = e.clientX - carouselStartX;
};

const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  const w = carouselWidth.value;
  if (dragOffset.value < -(w * 0.25)) {
    carouselPos.value = Math.min(carouselPos.value + 1, 4);
  } else if (dragOffset.value > w * 0.25) {
    carouselPos.value = Math.max(carouselPos.value - 1, 0);
  }
  dragOffset.value = 0;
  startAutoPlay();
};

const onTransitionEnd = () => {
  if (carouselPos.value === 0 || carouselPos.value === 4) {
    isTransitionEnabled.value = false;
    carouselPos.value = carouselPos.value === 0 ? 3 : 1;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitionEnabled.value = true;
      });
    });
  }
};
// ─────────────────────────────────────────────────────────────────

const isSmallScreen = ref(false);
const isMobileScreen = ref(false);

const checkScreenSize = () => {
  const isSmall = window.innerWidth < 1024;
  const isMobile = window.innerWidth < 640;

  isSmallScreen.value = isSmall;
  isMobileScreen.value = isMobile;

  if (isMobileScreen.value) {
    cardActiveIndex.value = null;
  } else if (isSmall && !cardActiveIndex.value) {
    cardActiveIndex.value = 0;
  } else if (!cardActiveIndex.value) {
    cardActiveIndex.value = null;
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  startAutoPlay();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
  stopAutoPlay();
});
</script>
