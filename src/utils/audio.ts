/**
 * Audio Engine for Viji Ma'am's Birthday Experience
 * 
 * Supports:
 * 1. Playing a custom audio file located at `src/assets/birthday-music.mp3`
 * 2. If no MP3 or if it fails to load, falls back to a calming, luxury acoustic
 *    harp/music-box Web Audio synthesizer arrangement.
 */

class BirthdayAudioPlayer {
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private audioEl: HTMLAudioElement | null = null;
  private useSynthesizer: boolean = true;

  constructor() {
    // Attempt to load MP3 if available
    try {
      this.audioEl = new Audio('/assets/birthday-music.mp3');
      this.audioEl.loop = true;
      this.audioEl.volume = 0.45;
    } catch {
      this.audioEl = null;
    }
  }

  public async toggle(onStateChange?: (playing: boolean) => void): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      const started = await this.start();
      if (onStateChange) onStateChange(started);
      return started;
    }
  }

  public async start(): Promise<boolean> {
    if (this.isPlaying) return true;

    // Try playing the MP3 first if valid
    if (this.audioEl && this.audioEl.src) {
      try {
        const playPromise = this.audioEl.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlaying = true;
          this.useSynthesizer = false;
          return true;
        }
      } catch {
        // Fallback to Web Audio synthesizer
        this.useSynthesizer = true;
      }
    }

    // Initialize Web Audio API
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioContextClass();
      }
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.isPlaying = true;
      this.playCalmMelodyLoop();
      return true;
    } catch (e) {
      console.warn("Audio playback not permitted or unavailable", e);
      this.isPlaying = false;
      return false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend().catch(() => {});
    }
  }

  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  /**
   * Procedural luxury music box / harp arrangement of Happy Birthday
   * in F major (F4, G4, A4, Bb4, C5, D5, E5) with warm acoustic bell harmonics
   */
  private playCalmMelodyLoop(): void {
    if (!this.isPlaying || !this.audioContext) return;

    // Notes with delays: [frequency in Hz, duration in seconds, note name]
    const notes: [number, number][] = [
      // "Happy Birthday to you"
      [349.23, 0.45], // F4
      [349.23, 0.45], // F4
      [392.00, 0.9],  // G4
      [349.23, 0.9],  // F4
      [466.16, 0.9],  // Bb4
      [440.00, 1.8],  // A4
      
      // "Happy Birthday to you"
      [349.23, 0.45], // F4
      [349.23, 0.45], // F4
      [392.00, 0.9],  // G4
      [349.23, 0.9],  // F4
      [523.25, 0.9],  // C5
      [466.16, 1.8],  // Bb4
      
      // "Happy Birthday dear Viji Ma'am"
      [349.23, 0.45], // F4
      [349.23, 0.45], // F4
      [698.46, 0.9],  // F5
      [587.33, 0.9],  // D5
      [466.16, 0.9],  // Bb4
      [440.00, 0.9],  // A4
      [392.00, 1.8],  // G4
      
      // "Happy Birthday to you"
      [622.25, 0.45], // Eb5
      [622.25, 0.45], // Eb5
      [587.33, 0.9],  // D5
      [466.16, 0.9],  // Bb4
      [523.25, 0.9],  // C5
      [466.16, 2.4],  // Bb4 (held)
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.audioContext) return;

      const [freq, duration] = notes[noteIndex];
      this.playHarpPluck(freq, duration * 1.1);

      // Also occasionally play a warm bass root on downbeats
      if (noteIndex === 0 || noteIndex === 6 || noteIndex === 12 || noteIndex === 19) {
        this.playHarpPluck(freq / 2, 2.5, 0.12);
      }

      noteIndex = (noteIndex + 1) % notes.length;
      const nextDelay = duration * 680; // slightly gentle tempo
      this.timerId = window.setTimeout(playNextNote, nextDelay);
    };

    playNextNote();
  }

  private playHarpPluck(freq: number, decayDuration: number = 1.2, volume: number = 0.18): void {
    if (!this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Primary fundamental oscillator (warm sine)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic oscillator (soft bell overtones)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(volume, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + decayDuration);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(volume * 0.35, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + decayDuration * 0.6);

    // Subtle lowpass filter for silky smooth warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(1, now);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + decayDuration + 0.1);
    osc2.stop(now + decayDuration + 0.1);
  }
}

export const birthdayAudio = new BirthdayAudioPlayer();
