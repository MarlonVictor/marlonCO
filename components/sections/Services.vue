<template>
  <section id="services" class="p-4">
    <div class="flex-1 bg-gray-950 rounded-2xl min-h-screen py-20 px-12">
      <ArrowText
        :text="data.services.title"
        arrow-side="down"
        font-size="text-base"
      />

      <div class="mt-8 flex flex-col gap-4">
        <h1 class="text-5xl font-normal text-offwhite-100">
          {{ data.services.tagline }}
        </h1>
        <p
          class="text-sm leading-tight text-offwhite-950 max-w-[32.5rem] text-justify"
        >
          {{ data.services.introduction }}
        </p>
      </div>

      <div class="grid grid-cols-3 gap-2 overflow-hidden mt-16">
        <ServiceCard>
          <template #animation>
            <div class="editor-wrap">
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
                  <span class="ln">03</span
                  ><span class="cm">// Main component</span>
                </div>
                <div class="type-line t1">
                  <span class="ln">04</span
                  ><span class="kw mr-1">export const</span>
                  <span class="fn">Dashboard</span> = () => {
                </div>
                <div class="type-line t2">
                  <span class="ln">05</span>&nbsp;&nbsp;<span class="kw"
                    >const</span
                  >
                  [data] = <span class="fn">ref</span>([])
                </div>
                <div class="type-line t3">
                  <span class="ln">06</span>&nbsp;&nbsp;<span class="kw mr-1"
                    >return</span
                  >
                  <span class="op">&lt;</span
                  ><span class="fn">Layout</span> data={data}
                  <span class="op">/&gt;</span>
                </div>
                <div class="type-line t4">
                  <span class="ln">07</span>}<span class="cursor"></span>
                </div>
              </div>
            </div>
          </template>
          <template #title>
            {{ data.services.items[0].name_line_1 }}<br />
            {{ data.services.items[0].name_line_2 }}
          </template>
        </ServiceCard>

        <ServiceCard @mouseenter="playVideo()" @mouseleave="pauseVideo()">
          <template #animation>
            <video ref="video" class="w-96 h-96 object-cover" muted>
              <source
                src="~/assets/animations/render-service.webm"
                type="video/webm"
              />
            </video>
          </template>
          <template #title>
            {{ data.services.items[1].name_line_1 }}<br />
            {{ data.services.items[1].name_line_2 }}
          </template>
        </ServiceCard>

        <ServiceCard>
          <template #animation>
            <div class="ds-wrap">
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
          <template #title>
            {{ data.services.items[2].name_line_1 }}<br />
            {{ data.services.items[2].name_line_2 }}
          </template>
        </ServiceCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import ArrowText from "../ui/ArrowText.vue";
import ServiceCard from "../ui/ServiceCard.vue";

const { data } = useLocale();

const video = ref(null);

const playVideo = () => {
  if (video.value) {
    video.value.play();
  }
};

const pauseVideo = () => {
  if (video.value) {
    video.value.pause();
  }
};
</script>

<style lang="css" scoped>
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
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* ── CARD 1: Editor ── */
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
.card:hover .editor-wrap {
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
.card:hover .type-line.t1 {
  animation: type 1.2s steps(22, end) 0.5s both;
}
.card:hover .type-line.t2 {
  animation: type 1s steps(18, end) 1.8s both;
}
.card:hover .type-line.t3 {
  animation: type 0.9s steps(16, end) 2.9s both;
}
.card:hover .type-line.t4 {
  animation: type 0.6s steps(10, end) 3.9s both;
}
@keyframes type {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* ── CARD 2: Design System ── */
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
.card:hover .ds-swatch {
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
  color: #888;
}
.ds-type-item:nth-child(1) .ds-type-sample {
  font-size: 22px;
  font-weight: 800;
  color: #ddd;
}
.ds-type-item:nth-child(2) .ds-type-sample {
  font-size: 15px;
  font-weight: 700;
  color: #aaa;
}
.ds-type-item:nth-child(3) .ds-type-sample {
  font-size: 11px;
  font-weight: 400;
  color: #555;
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
.card:hover .ds-btn {
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
