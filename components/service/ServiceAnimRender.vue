<template>
  <video ref="videoEl" class="w-96 h-96 object-cover" muted loop playsinline>
    <source src="~/assets/animations/render-service.webm" type="video/webm" />
  </video>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const videoEl = ref(null);
let card = null;

const play = () => videoEl.value?.play();
const pause = () => videoEl.value?.pause();

onMounted(() => {
  card = videoEl.value?.closest(".card");
  card?.addEventListener("mouseenter", play);
  card?.addEventListener("mouseleave", pause);
});

onBeforeUnmount(() => {
  card?.removeEventListener("mouseenter", play);
  card?.removeEventListener("mouseleave", pause);
});
</script>
