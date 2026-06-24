<template>
  <div>
    <IntroSplash />

    <div class="app-content" :class="{ 'app-content--locked': !isComplete }">
      <CustomCursor v-if="isComplete" />
      <NuxtPage />
      <AboutPopupContact v-model="showContactPopup" />
    </div>
  </div>
</template>

<script setup>
import CustomCursor from "./components/layout/CustomCursor.vue";
import IntroSplash from "./components/layout/IntroSplash.vue";

const { isComplete } = useIntroSplash();

const showContactPopup = ref(false);
provide("openContactPopup", () => {
  showContactPopup.value = true;
});
</script>

<style scoped>
.app-content--locked {
  pointer-events: none;
}
</style>
