// Web Audio API Synthesizer and Audio Player for smooth background music and sound effects

let audioCtx: AudioContext | null = null;
let bgMusicNode: OscillatorNode | null = null;
let bgGainNode: GainNode | null = null;
let musicInterval: number | null = null;
let customAudioElement: HTMLAudioElement | null = null;
let musicDurationTimeout: number | null = null;
let isMuted = false;

export function ensureAudioStarted(): void {
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  if (customAudioElement && customAudioElement.paused && !isMuted) {
    customAudioElement.play().catch(() => {});
  }
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Gentle birthday melody notes (Happy Birthday / Warm Melody)
const MELODY_NOTES = [
  261.63, 261.63, 293.66, 261.63, 349.23, 329.63, // Happy birthday to you
  261.63, 261.63, 293.66, 261.63, 392.00, 349.23, // Happy birthday to you
  261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, // Happy birthday dear friend
  466.16, 466.16, 440.00, 349.23, 392.00, 349.23  // Happy birthday to you
];

export function startBackgroundMusic(
  style: 'dooron_dooron' | 'soft_warm' | 'gentle_upbeat' | 'custom' = 'soft_warm',
  customUrl?: string,
  durationMinutes: number = 2
) {
  if (isMuted) return;
  stopBackgroundMusic();

  const durationMs = Math.max(30, Math.min(240, durationMinutes * 60)) * 1000;

  // Set timeout to automatically fade or stop music after specified duration (0.5 to 4 minutes)
  musicDurationTimeout = window.setTimeout(() => {
    stopBackgroundMusic();
  }, durationMs);

  if (style === 'custom' && customUrl) {
    try {
      customAudioElement = new Audio(customUrl);
      customAudioElement.loop = true;
      customAudioElement.volume = 0.4;
      customAudioElement.play().catch((err) => {
        console.warn('Auto-play blocked or audio load error:', err);
      });
      return;
    } catch (e) {
      console.warn('Error playing custom audio:', e);
    }
  }

  try {
    const ctx = getAudioContext();
    bgGainNode = ctx.createGain();
    bgGainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    bgGainNode.connect(ctx.destination);

    let noteIdx = 0;
    const speed = style === 'gentle_upbeat' ? 350 : style === 'dooron_dooron' ? 450 : 550;

    const playNextNote = () => {
      if (!ctx || isMuted) return;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      const freq = MELODY_NOTES[noteIdx % MELODY_NOTES.length];
      osc.type = style === 'dooron_dooron' ? 'sine' : style === 'gentle_upbeat' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      noteGain.gain.setValueAtTime(0.06, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (speed / 1000) * 0.9);

      osc.connect(noteGain);
      if (bgGainNode) {
        noteGain.connect(bgGainNode);
      } else {
        noteGain.connect(ctx.destination);
      }

      osc.start();
      osc.stop(ctx.currentTime + (speed / 1000));
      noteIdx++;
    };

    playNextNote();
    musicInterval = window.setInterval(playNextNote, speed);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

export function stopBackgroundMusic() {
  if (musicDurationTimeout !== null) {
    clearTimeout(musicDurationTimeout);
    musicDurationTimeout = null;
  }
  if (musicInterval !== null) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  if (bgMusicNode) {
    try { bgMusicNode.stop(); } catch { /* ignore */ }
    bgMusicNode = null;
  }
  if (customAudioElement) {
    try {
      customAudioElement.pause();
      customAudioElement.currentTime = 0;
    } catch { /* ignore */ }
    customAudioElement = null;
  }
}

export function toggleAudioMute(): boolean {
  isMuted = !isMuted;
  if (isMuted) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic('soft_warm');
  }
  return isMuted;
}

export function getMuteState(): boolean {
  return isMuted;
}

// Sound Effects
export function playPopSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch { /* ignore */ }
}

export function playGiftOpenSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      gain.gain.setValueAtTime(0.15, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.3);
    });
  } catch { /* ignore */ }
}

export function playKeypadClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch { /* ignore */ }
}

export function playCandleBlowSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // White noise swoosh for candle blow out
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch { /* ignore */ }
}
