<template>
  <div>
    <CustomCursor />
    <NuxtPage />
    <AboutPopupContact v-model="showContactPopup" />
  </div>
</template>

<script setup>
import CustomCursor from "./components/layout/CustomCursor.vue";

const showContactPopup = ref(false);
provide("openContactPopup", () => {
  showContactPopup.value = true
})
</script>
