let ctx: AudioContext | null = null;

function tone(freq: number, start: number, dur: number, vol = 0.05) {
  if (typeof window === "undefined") return;
  try {
    ctx ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    const t = ctx.currentTime + start;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch {
    /* audio not available */
  }
}

export const playClick = () => tone(880, 0, 0.08, 0.04);
export const playSuccess = () => { tone(660, 0, 0.18); tone(880, 0.12, 0.18); tone(1320, 0.24, 0.35); };
