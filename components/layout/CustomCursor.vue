<template>
  <div
    ref="cursorEl"
    class="custom-cursor"
    :class="{
      'custom-cursor--hover': cursorState.hovering && !cursorState.label,
      'custom-cursor--label': !!cursorState.label,
      'custom-cursor--hidden':
        !cursorState.active || cursorState.hidden || cursorState.forcedHidden,
    }"
    :style="{
      transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0) translate(-50%, -50%)`,
    }"
    aria-hidden="true"
  >
    <span v-if="cursorState.label" class="custom-cursor__label">
      {{ cursorState.label }}
    </span>
  </div>
</template>

<script setup>
import { useCursor } from "~/composables/useCursor";

const { cursorState } = useCursor();
</script>

<style>
/* ==========================================
   CUSTOM CURSOR
   ========================================== */

/* Hide the system cursor only after the custom cursor has received pointer input */
html.cursor-custom-active,
html.cursor-custom-active *,
html.cursor-custom-active *::before,
html.cursor-custom-active *::after {
  cursor: none !important;
}

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;
  box-sizing: border-box;

  /* Default: square */
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 2px;

  /* mix-blend-mode difference gives the inverted-color effect */
  background: white;
  mix-blend-mode: difference;

  /* Smooth morphing transitions */
  transition:
    width 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    border-radius 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    padding 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.25s ease;

  /* GPU acceleration */
  will-change: transform;
  backface-visibility: hidden;

  opacity: 1;
}

/* Hover state: morph to larger circle */
.custom-cursor--hover {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}

/* Label state: pill expands to fit text */
.custom-cursor--label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 2rem;
  padding: 0 0.875rem;
  border-radius: 4px;
  transition:
    width 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    height 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    border-radius 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    padding 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.25s ease;
}

.custom-cursor__label {
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1;
  /* Opposite of the white cursor bg — stays visible after difference blend */
  color: #000;
  white-space: nowrap;
  text-transform: uppercase;
}

/* Hidden when cursor leaves viewport */
.custom-cursor--hidden {
  opacity: 0;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .custom-cursor {
    display: none;
  }

  html.cursor-custom-active,
  html.cursor-custom-active *,
  html.cursor-custom-active *::before,
  html.cursor-custom-active *::after {
    cursor: auto !important;
  }
}

/* Disable on touch-only devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor {
    display: none;
  }

  html.cursor-custom-active,
  html.cursor-custom-active *,
  html.cursor-custom-active *::before,
  html.cursor-custom-active *::after {
    cursor: auto !important;
  }
}
</style>
