<template>
  <div>
    <IntroSplash />

    <div class="app-content" :class="{ 'app-content--locked': locked }">
      <CustomCursor v-if="!locked" />
      <NuxtPage />
      <AboutPopupContact v-model="showContactPopup" />
    </div>
  </div>
</template>

<script setup>
import CustomCursor from "./components/layout/CustomCursor.vue";
import IntroSplash from "./components/layout/IntroSplash.vue";

const { isComplete } = useIntroSplash();

// `locked` começa true no SSR e no primeiro render do cliente (HTML idêntico,
// sem hydration mismatch) e só reflete isComplete após o mount. Sem isso, em
// rotas que pulam o splash (isComplete já é true antes do 1º render) o binding
// nunca re-renderiza e a classe do SSR fica presa, travando o pointer-events.
const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
const locked = computed(() => (mounted.value ? !isComplete.value : true));

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
