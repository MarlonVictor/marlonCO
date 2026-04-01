<template>
  <div
    ref="cursorEl"
    class="custom-cursor"
    :class="{
      'custom-cursor--hover': cursorState.hovering,
      'custom-cursor--hidden': cursorState.hidden || cursorState.forcedHidden,
    }"
    :style="{
      transform: `translate3d(${cursorState.x}px, ${cursorState.y}px, 0)`,
    }"
    aria-hidden="true"
  />
</template>

<script setup>
import { useCursor } from "~/composables/useCursor";

const { cursorState } = useCursor();
</script>

<style>
/* ==========================================
   CUSTOM CURSOR
   ========================================== */

/* Hide the system cursor everywhere */
*,
*::before,
*::after {
  cursor: none !important;
}

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  pointer-events: none;

  /* Center the shape on the pointer */
  margin-left: -0.375rem;
  margin-top: -0.375rem;

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
    margin 0.35s cubic-bezier(0.25, 1, 0.5, 1),
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
  margin-left: -0.75rem;
  margin-top: -0.75rem;
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

  *,
  *::before,
  *::after {
    cursor: auto !important;
  }
}

/* Disable on touch-only devices */
@media (hover: none) and (pointer: coarse) {
  .custom-cursor {
    display: none;
  }

  *,
  *::before,
  *::after {
    cursor: auto !important;
  }
}
</style>
