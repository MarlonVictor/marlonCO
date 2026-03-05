import { ref, onMounted, onUnmounted } from "vue";

interface CursorState {
  x: number;
  y: number;
  hovering: boolean;
  hidden: boolean;
}

const cursorState = ref<CursorState>({
  x: -100,
  y: -100,
  hovering: false,
  hidden: true,
});

let initialized = false;
let mouseX = -100;
let mouseY = -100;
let rafId: number | null = null;

const INTERACTIVE_SELECTORS = [
  "a",
  "button",
  '[role="button"]',
  'input[type="submit"]',
  'input[type="button"]',
  "select",
  "label[for]",
  "[data-cursor-hover]",
].join(",");

function isInteractive(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  return (
    target.closest(INTERACTIVE_SELECTORS) !== null ||
    window.getComputedStyle(target).cursor === "pointer"
  );
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorState.value.hidden = false;
  cursorState.value.hovering = isInteractive(e.target);
}

function onMouseDown() {
  // Could extend for click effects
}

function onMouseLeave() {
  cursorState.value.hidden = true;
}

function onMouseEnter() {
  cursorState.value.hidden = false;
}

// Lerp loop for smooth following
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function animate() {
  const ease = 0.15;
  cursorState.value.x = lerp(cursorState.value.x, mouseX, ease);
  cursorState.value.y = lerp(cursorState.value.y, mouseY, ease);
  rafId = requestAnimationFrame(animate);
}

export function useCursor() {
  onMounted(() => {
    if (!initialized) {
      document.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mouseenter", onMouseEnter);
      animate();
      initialized = true;
    }
  });

  onUnmounted(() => {
    // Don't tear down — the cursor is a singleton that persists across pages
  });

  return {
    cursorState,
  };
}
