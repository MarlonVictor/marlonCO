<template>
  <div ref="wrap" class="editor-wrap" :class="{ hovered }">
    <div class="editor-bar">
      <div class="dot r"></div>
      <div class="dot y"></div>
      <div class="dot g"></div>
      <span class="editor-filename">App.vue</span>
    </div>
    <div class="editor-body">
      <div>
        <span class="ln">01</span><span class="kw">import</span>
        <span class="fn mx-1">{ ref }</span>
        <span class="kw mr-1">from</span>
        <span class="str">'vue'</span>
      </div>
      <div>
        <span class="ln">02</span><span class="kw">import</span>
        <span class="fn mx-1">Layout</span>
        <span class="kw mr-1">from</span>
        <span class="str">'./Layout.vue'</span>
      </div>
      <div>
        <span class="ln">03</span><span class="cm">// Main component</span>
      </div>
      <div class="type-line t1">
        <span class="ln">04</span><span class="kw mr-1">export const</span>
        <span class="fn">Dashboard</span> = () => {
      </div>
      <div class="type-line t2">
        <span class="ln">05</span>&nbsp;&nbsp;<span class="kw">const</span>
        [data] = <span class="fn">ref</span>([])
      </div>
      <div class="type-line t3">
        <span class="ln">06</span>&nbsp;&nbsp;<span class="kw mr-1"
          >return</span
        >
        <span class="op">&lt;</span><span class="fn">Layout</span> data={data}
        <span class="op">/&gt;</span>
      </div>
      <div class="type-line t4">
        <span class="ln">07</span>}<span class="cursor"></span>
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
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
@keyframes type {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.editor-wrap {
  width: 24rem;
  height: 14rem;
  background: #0d0d0d;
  border: 1px solid #242424;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  transform: perspective(800px) rotateX(6deg) rotateY(-4deg);
  transition: transform 0.5s ease;
  color: #ddd;
  margin: auto;
}
.editor-wrap.hovered {
  transform: perspective(800px) rotateX(2deg) rotateY(-1deg);
}
.editor-bar {
  background: #151515;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid #1e1e1e;
}
.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.editor-filename {
  font-family: monospace;
  font-size: 9px;
  color: #444;
  margin-left: 8px;
}
.editor-body {
  padding: 14px 16px;
  font-family: monospace;
  font-size: 10px;
  line-height: 1.9;
}
.ln {
  color: #2a2a2a;
  margin-right: 14px;
  user-select: none;
}
.kw {
  color: #ff4d1d;
}
.fn {
  color: #f0a070;
}
.str {
  color: #c3e88d;
}
.op {
  color: #ddd;
}
.cm {
  color: #333;
}
.cursor {
  display: inline-block;
  width: 2px;
  height: 11px;
  background: #ddd;
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}
.type-line {
  overflow: hidden;
  white-space: nowrap;
}
.editor-wrap.hovered .type-line.t1 {
  animation: type 1.2s steps(22, end) 0.5s both;
}
.editor-wrap.hovered .type-line.t2 {
  animation: type 1s steps(18, end) 1.8s both;
}
.editor-wrap.hovered .type-line.t3 {
  animation: type 0.9s steps(16, end) 2.9s both;
}
.editor-wrap.hovered .type-line.t4 {
  animation: type 0.6s steps(10, end) 3.9s both;
}
</style>
