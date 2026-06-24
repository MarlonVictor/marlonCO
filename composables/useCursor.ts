import { ref, onMounted, onUnmounted } from "vue";

interface CursorState {
  x: number;
  y: number;
  hovering: boolean;
  /** Label from data-cursor-hover="..." — pill cursor with text */
  label: string | null;
  hidden: boolean;
  forcedHidden: boolean;
  /** True after the first pointer move — gates system cursor hiding */
  active: boolean;
}

const CURSOR_ACTIVE_CLASS = "cursor-custom-active";

const cursorState = ref<CursorState>({
  x: -100,
  y: -100,
  hovering: false,
  label: null,
  hidden: true,
  forcedHidden: false,
  active: false,
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
  "[class*='cursor-pointer']",
].join(",");

function isPointerDevice(): boolean {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function isInsideViewport(clientX: number, clientY: number): boolean {
  return (
    clientX >= 0 &&
    clientY >= 0 &&
    clientX <= window.innerWidth &&
    clientY <= window.innerHeight
  );
}

function getHoverTarget(target: EventTarget | null): HTMLElement | null {
  if (!target || !(target instanceof HTMLElement)) return null;
  return target.closest(INTERACTIVE_SELECTORS);
}

function getCursorLabel(target: HTMLElement | null): string | null {
  if (!target) return null;

  const labeled = target.closest("[data-cursor-hover]");
  if (!labeled) return null;

  const value = labeled.getAttribute("data-cursor-hover")?.trim();
  return value || null;
}

function activateCursor() {
  if (cursorState.value.active) return;
  cursorState.value.active = true;
  document.documentElement.classList.add(CURSOR_ACTIVE_CLASS);
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  activateCursor();

  const inViewport = isInsideViewport(e.clientX, e.clientY);
  if (!inViewport || cursorState.value.forcedHidden) {
    cursorState.value.hidden = true;
  } else {
    cursorState.value.hidden = false;
  }

  const hoverTarget = inViewport ? getHoverTarget(e.target) : null;
  cursorState.value.hovering = hoverTarget !== null;
  cursorState.value.label = getCursorLabel(hoverTarget);
}

function setForcedHidden(value: boolean) {
  cursorState.value.forcedHidden = value;
  cursorState.value.hidden = value;
}

function onMouseDown() {
  // Could extend for click effects
}

function onMouseLeave() {
  cursorState.value.hidden = true;
}

function onMouseEnter() {
  if (!cursorState.value.forcedHidden) {
    cursorState.value.hidden = false;
  }
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

function ensureInitialized() {
  if (initialized || import.meta.server || !isPointerDevice()) return;

  document.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseleave", onMouseLeave);
  document.addEventListener("mouseenter", onMouseEnter);
  animate();
  initialized = true;
}

export function useCursor() {
  onMounted(() => {
    ensureInitialized();
  });

  onUnmounted(() => {
    // Don't tear down — the cursor is a singleton that persists across pages
  });

  return {
    cursorState,
    setForcedHidden,
  };
}
