<template>
  <div ref="wrap" class="ds-wrap" :class="{ hovered }">
    <div>
      <div class="ds-label">COLOR TOKENS</div>
      <div class="ds-colors">
        <div class="ds-swatch"></div>
        <div class="ds-swatch"></div>
        <div class="ds-swatch"></div>
        <div class="ds-swatch"></div>
        <div class="ds-swatch"></div>
      </div>
    </div>
    <div>
      <div class="ds-label">TYPOGRAPHY</div>
      <div class="ds-type-item">
        <span class="ds-type-label">H1</span
        ><span class="ds-type-sample">Headline</span>
      </div>
      <div class="ds-type-item">
        <span class="ds-type-label">H3</span
        ><span class="ds-type-sample">Subheading</span>
      </div>
      <div class="ds-type-item">
        <span class="ds-type-label">body</span
        ><span class="ds-type-sample">Body text regular</span>
      </div>
    </div>
    <div>
      <div class="ds-label">COMPONENTS</div>
      <div class="ds-btns">
        <div class="ds-btn p">PRIMARY</div>
        <div class="ds-btn s">OUTLINE</div>
        <div class="ds-btn g">DISABLED</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const wrap = ref(null);
const hovered = ref(false);
let card = null;

const onEnter = () => (hovered.value = true);
const onLeave = () => (hovered.value = false);

onMounted(() => {
  card = wrap.value?.closest(".card");
  card?.addEventListener("mouseenter", onEnter);
  card?.addEventListener("mouseleave", onLeave);
});

onBeforeUnmount(() => {
  card?.removeEventListener("mouseenter", onEnter);
  card?.removeEventListener("mouseleave", onLeave);
});
</script>

<style scoped>
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes swatchIn {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.ds-wrap {
  width: 14rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ds-label {
  font-family: monospace;
  font-size: 8px;
  color: #333;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
.ds-colors {
  display: flex;
  gap: 6px;
}
.ds-swatch {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  transition: transform 0.3s ease;
}
.ds-wrap.hovered .ds-swatch {
  animation: swatchIn 1s ease both;
  transform: scale(1.15);
}
.ds-swatch:nth-child(1) {
  animation-delay: 0.2s;
  background: #ff4d1d;
}
.ds-swatch:nth-child(2) {
  animation-delay: 0.35s;
  background: #ff8c6b;
}
.ds-swatch:nth-child(3) {
  animation-delay: 0.5s;
  background: #f0f0f0;
}
.ds-swatch:nth-child(4) {
  animation-delay: 0.65s;
  background: #1a1a1a;
  border: 1px solid #333;
}
.ds-swatch:nth-child(5) {
  animation-delay: 0.8s;
  background: #2a2a2a;
  border: 1px solid #333;
}
.ds-type-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  border-bottom: 1px solid #1a1a1a;
  padding: 4px 0;
}
.ds-type-label {
  font-family: monospace;
  font-size: 8px;
  color: #2a2a2a;
  width: 28px;
  flex-shrink: 0;
}
.ds-type-sample {
  font-family: sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #555;
}
.ds-type-item:nth-child(2) .ds-type-sample {
  font-size: 22px;
  font-weight: 800;
  color: #ddd;
}
.ds-type-item:nth-child(3) .ds-type-sample {
  font-size: 15px;
  font-weight: 700;
  color: #aaa;
}
.ds-btns {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}
.ds-btn {
  padding: 5px 12px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.05em;
}
.ds-wrap.hovered .ds-btn {
  animation: fadein 3s ease both;
}
.ds-btn.p {
  background: #ff4d1d;
  color: #000;
  animation-delay: 2s;
}
.ds-btn.s {
  background: transparent;
  color: #ff4d1d;
  border: 1px solid #ff4d1d;
  animation-delay: 3s;
}
.ds-btn.g {
  background: #1a1a1a;
  color: #444;
  animation-delay: 4s;
}
</style>
