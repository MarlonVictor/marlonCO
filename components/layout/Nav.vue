<template>
  <nav
    :class="{ 'nav-hidden': !isVisible }"
    class="flex items-center p-8 fixed top-0 left-0 right-0 z-50"
  >
    <div
      class="flex-1 flex items-center justify-between py-4 px-12 nav-content relative"
    >
      <!-- Blur background layer -->
      <div class="nav-blur"></div>

      <!-- Logo -->
      <h1 class="text-offwhite-100 font-medium text-xl font-mono relative z-10">
        <span class="tracking-widest">MARLON.CO</span>
      </h1>

      <!-- Desktop nav links (hidden on ≤ 1024px) -->
      <ul
        class="hidden lg:inline-flex absolute left-0 right-0 items-center justify-center gap-8 text-base uppercase font-medium font-mono text-offwhite-200 z-10"
      >
        <li v-for="(item, index) in data.nav.links" :key="index">
          <a :href="item.href">
            <HoverText :text="item.name" text-class="text-offwhite-200" />
          </a>
        </li>
      </ul>

      <!-- Desktop language switcher (hidden on ≤ 1024px) -->
      <div class="hidden lg:flex items-center gap-6 z-10 relative">
        <ButtonAnimated :text="data.nav.cta" @click="openContactPopup?.()" />

        <ul
          class="flex items-center text-offwhite-200 text-base font-mono space-x-2"
        >
          <li>
            <a
              hreflang="pt-BR"
              href="#"
              @click.prevent="switchLanguage('pt-BR')"
            >
              PT
            </a>
          </li>
          <li class="text-xl">|</li>
          <li>
            <a hreflang="en" href="#" @click.prevent="switchLanguage('en')">
              EN
            </a>
          </li>
        </ul>
      </div>

      <!-- Hamburger button (visible on ≤ 1024px) -->
      <button
        class="lg:hidden relative z-10 flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        :class="{ 'is-open': menuOpen }"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>

    <!-- Mobile fullscreen menu -->
    <Transition name="fullscreen-menu">
      <div
        v-if="menuOpen"
        class="lg:hidden fixed inset-0 z-40 bg-gray-950 flex flex-col"
      >
        <!-- Close button -->
        <div class="flex justify-end items-center px-8 pt-8 pb-6">
          <button
            class="relative z-10 flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-offwhite-950"
            :class="{ 'is-open': true }"
            aria-label="Fechar menu"
            @click="menuOpen = false"
          >
            <Icon name="lucide:x" size="24" />
          </button>
        </div>

        <div
          class="flex flex-col justify-center items-center flex-1 gap-10 px-8"
        >
          <!-- Links -->
          <ul
            class="flex flex-col items-center gap-8 text-4xl uppercase font-medium font-mono text-offwhite-200"
          >
            <li
              v-for="(item, index) in data.nav.links"
              :key="index"
              :style="{
                transitionDelay: menuOpen ? `${100 + index * 80}ms` : '0ms',
              }"
              class="menu-item-slide"
              :class="{ 'menu-item-visible': menuOpen }"
            >
              <a
                :href="item.href"
                @click="menuOpen = false"
                class="hover:text-primary-500 transition-colors duration-200"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>

          <!-- Divider -->
          <div class="w-12 h-px bg-offwhite-100/20"></div>

          <!-- Language switcher -->
          <ul
            class="flex items-center text-offwhite-400 text-lg font-mono space-x-3"
            @click="menuOpen = false"
          >
            <li>
              <a
                hreflang="pt-BR"
                href="#"
                @click.prevent="switchLanguage('pt-BR')"
                class="hover:text-primary-500 transition-colors duration-200"
                >PT</a
              >
            </li>
            <li class="text-xl text-offwhite-950">|</li>
            <li>
              <a
                hreflang="en"
                href="#"
                @click.prevent="switchLanguage('en')"
                class="hover:text-primary-500 transition-colors duration-200"
                >EN</a
              >
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import HoverText from "../ui/HoverText.vue";
import ButtonAnimated from "../ui/ButtonAnimated.vue";

const { data, switchLanguage } = useLocale();
const openContactPopup = inject("openContactPopup");

const isVisible = ref(true);
const menuOpen = ref(false);
const lastScrollY = ref(0);
const scrollThreshold = 50;

const handleScroll = () => {
  if (typeof window === "undefined") return;

  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY.value;

  if (currentScrollY < scrollThreshold) {
    isVisible.value = true;
  } else if (scrollDelta > 5) {
    isVisible.value = false;
  } else if (scrollDelta < -5) {
    isVisible.value = true;
  }

  lastScrollY.value = currentScrollY;
};

const handleKeydown = (event) => {
  if (event.key === "Escape" && menuOpen.value) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", handleKeydown);
  }
});
</script>

<style scoped>
nav {
  transition: top 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

nav.nav-hidden {
  top: -120px;
}

.nav-content {
  border-radius: 10px;
  position: relative;
}

.nav-blur {
  position: absolute;
  inset: 0;
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  backdrop-filter: blur(10px) saturate(180%);
  background-color: rgba(48, 48, 48, 0.5);
  border-radius: inherit;
  border: 1px solid rgba(245, 243, 237, 0.13);
}

/* Hamburger bars */
.hamburger-bar {
  display: block;
  width: 1.5rem;
  height: 2px;
  background-color: #fafafa;
  border-radius: 2px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform-origin: center;
}

button.is-open .hamburger-bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
button.is-open .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
button.is-open .hamburger-bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Fullscreen menu transition */
.fullscreen-menu-enter-active,
.fullscreen-menu-leave-active {
  transition: clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fullscreen-menu-enter-from,
.fullscreen-menu-leave-to {
  clip-path: inset(0 0 100% 0);
}
.fullscreen-menu-enter-to,
.fullscreen-menu-leave-from {
  clip-path: inset(0 0 0% 0);
}

/* Menu items slide in */
.menu-item-slide {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.menu-item-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
