const SPLASH_MIN_DURATION = 400;
const SPLASH_EXIT_DURATION = 780;
const SPLASH_MAX_WAIT = 2800;
const SIMULATED_CAP = 92;
const SIMULATED_RAMP_MS = 900;

const showSplash = ref(false);
const isExiting = ref(false);
const isComplete = ref(false);
const readyKeys = ref(new Set<string>());
const splashStartTime = ref(0);
const displayProgress = ref(0);

let initialized = false;
let dismissPromise: Promise<void> | null = null;
let progressFrame: number | null = null;
let activePath = "/";

function getRequiredKeys(path: string): string[] {
  if (path === "/") {
    return ["scroll-carousel"];
  }

  return [];
}

function getReadinessProgress(path: string): number {
  const required = getRequiredKeys(path);
  if (required.length === 0) return 100;

  const ready = required.filter((key) => readyKeys.value.has(key)).length;
  return (ready / required.length) * 100;
}

function getSimulatedProgress(): number {
  if (!splashStartTime.value) return 0;

  const elapsed = Date.now() - splashStartTime.value;
  const t = Math.min(1, elapsed / SIMULATED_RAMP_MS);
  const eased = 1 - (1 - t) ** 2;

  return eased * SIMULATED_CAP;
}

function getEffectiveTarget(path: string): number {
  return Math.max(getSimulatedProgress(), getReadinessProgress(path));
}

function stopProgressLoop() {
  if (progressFrame) {
    cancelAnimationFrame(progressFrame);
    progressFrame = null;
  }
}

function startProgressLoop() {
  stopProgressLoop();

  const tick = () => {
    if (isComplete.value) {
      progressFrame = null;
      return;
    }

    const target = isExiting.value ? 100 : getEffectiveTarget(activePath);
    const diff = target - displayProgress.value;

    if (Math.abs(diff) > 0.4) {
      displayProgress.value += diff * 0.28;
    } else {
      displayProgress.value = target;
    }

    progressFrame = requestAnimationFrame(tick);
  };

  progressFrame = requestAnimationFrame(tick);
}

export function useIntroSplash() {
  const route = useRoute();
  activePath = route.path;

  const requiredKeys = computed(() => getRequiredKeys(route.path));

  const allReady = computed(() => {
    const keys = requiredKeys.value;
    if (keys.length === 0) return true;
    return keys.every((key) => readyKeys.value.has(key));
  });

  function markReady(key: string) {
    if (readyKeys.value.has(key)) return;
    readyKeys.value = new Set([...readyKeys.value, key]);
  }

  async function dismissSplash() {
    if (!showSplash.value || isExiting.value || isComplete.value) return;
    if (dismissPromise) return dismissPromise;

    dismissPromise = (async () => {
      const elapsed = Date.now() - splashStartTime.value;
      const remaining = Math.max(0, SPLASH_MIN_DURATION - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      displayProgress.value = 100;
      isExiting.value = true;
      document.documentElement.classList.remove("splash-active");
      document.documentElement.classList.add("intro-ready");

      await new Promise((resolve) =>
        setTimeout(resolve, SPLASH_EXIT_DURATION),
      );

      showSplash.value = false;
      isComplete.value = true;
      stopProgressLoop();
    })();

    return dismissPromise;
  }

  function initSplash() {
    if (initialized || import.meta.server) return;

    initialized = true;
    activePath = route.path;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showSplash.value = false;
      isComplete.value = true;
      document.documentElement.classList.remove("splash-active");
      document.documentElement.classList.add("intro-ready");
      return;
    }

    splashStartTime.value = Date.now();
    displayProgress.value = 0;
    startProgressLoop();

    const maxWaitTimer = window.setTimeout(() => {
      requiredKeys.value.forEach((key) => markReady(key));
    }, SPLASH_MAX_WAIT);

    watch(
      allReady,
      (ready) => {
        if (ready) {
          window.clearTimeout(maxWaitTimer);
          dismissSplash();
        }
      },
      { immediate: true },
    );
  }

  const canAnimate = computed(() => isExiting.value || isComplete.value);
  const canAnimateContent = computed(() => isComplete.value);

  return {
    showSplash,
    isExiting,
    isComplete,
    canAnimate,
    canAnimateContent,
    progress: displayProgress,
    markReady,
    initSplash,
    allReady,
  };
}

export function useWhenIntroComplete(callback: () => void) {
  const { isExiting, isComplete } = useIntroSplash();

  if (import.meta.server) return;

  let called = false;

  const trigger = () => {
    if (called) return;
    if (isExiting.value || isComplete.value) {
      called = true;
      callback();
    }
  };

  trigger();
  watch([isExiting, isComplete], trigger);
}
