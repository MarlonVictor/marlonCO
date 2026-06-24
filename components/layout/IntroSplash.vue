<template>
  <Teleport to="body">
    <Transition name="splash-fade">
      <div
        v-if="showSplash"
        class="intro-splash"
        :class="{ 'intro-splash--exit': isExiting }"
        aria-live="polite"
        aria-label="Carregando"
      >
        <div class="intro-splash__content">
          <p class="intro-splash__logo font-mono">marlon.co</p>

          <div class="intro-splash__track" aria-hidden="true">
            <span
              class="intro-splash__bar"
              :style="{ transform: `scaleX(${progress / 100})` }"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const { showSplash, isExiting, progress } = useIntroSplash();
</script>

<style scoped>
.intro-splash {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0d0d0d;
}

.intro-splash__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.intro-splash__logo {
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(250, 250, 250, 0.82);
}

.intro-splash__track {
  width: min(7rem, 42vw);
  height: 1px;
  background: rgba(250, 250, 250, 0.16);
  overflow: hidden;
}

.intro-splash__bar {
  display: block;
  width: 100%;
  height: 100%;
  background: #ff4d1d;
  transform-origin: left center;
  will-change: transform;
}

.intro-splash--exit {
  animation: splash-exit 0.75s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.intro-splash--exit .intro-splash__content {
  animation: splash-content-out 0.45s ease forwards;
}

@keyframes splash-exit {
  to {
    transform: translateY(-100%);
  }
}

@keyframes splash-content-out {
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 0.2s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .intro-splash__bar,
  .intro-splash--exit,
  .intro-splash--exit .intro-splash__content {
    animation: none !important;
  }
}
</style>
