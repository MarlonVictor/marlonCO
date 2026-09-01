/**
 * "Pop" curtinho sintetizado na hora (WebAudio) — sem arquivo de áudio.
 * O AudioContext nasce suspenso até o primeiro gesto do usuário: navegadores
 * bloqueiam áudio antes disso, então só destrava em pointerdown/keydown.
 */
let ctx: AudioContext | null = null;
let unlocked = false;

function ensureContext() {
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ?? (window as any).webkitAudioContext ?? null;
  if (!Ctor) return null;
  ctx = new Ctor();

  const unlock = () => {
    unlocked = true;
    ctx?.resume();
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
  return ctx;
}

export function usePopSound(options: { volume?: number } = {}) {
  const volume = options.volume ?? 0.035;

  function pop() {
    if (!import.meta.client) return;
    const audio = ensureContext();
    if (!audio || !unlocked || audio.state !== "running") return;

    const now = audio.currentTime;
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    const filter = audio.createBiquadFilter();

    // Leve variação de altura pra repetição não soar mecânica.
    osc.type = "sine";
    osc.frequency.setValueAtTime(520 + Math.random() * 180, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);

    // Envelope bem curto: ataque imediato, cauda de ~90ms.
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter).connect(gain).connect(audio.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  return { pop };
}
