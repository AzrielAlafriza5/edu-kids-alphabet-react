export const playDing = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // A6
    
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch(e) {}
};

export const playBlup = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch(e) {}
};

export const startLetterLoop = (letter: string, lang: string = 'id-ID') => {
  stopLetterLoop();
  if ('speechSynthesis' in window) {
    const speak = () => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = lang;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    };
    speak();
    (window as any).letterLoopInterval = window.setInterval(speak, 1200);
  }
};

export const stopLetterLoop = () => {
  if ((window as any).letterLoopInterval) {
    window.clearInterval((window as any).letterLoopInterval);
    (window as any).letterLoopInterval = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const speakWord = (word: string, lang: string = 'id-ID') => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

export const playTransitionSound = (categoryId: string) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (categoryId === 'hewan' || categoryId === 'sayuran') {
      // Rustling sound (like grass)
      osc.type = 'square';
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else {
      // Magic/Whoosh sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch(e) {}
};

export const playLaugh = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance('hi hi hi');
    utterance.lang = 'id-ID';
    utterance.pitch = 2; // high pitch for kid 
    utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  }
};

export const playTada = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        // C major chord arpeggio
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            
            gainNode.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.1);
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.1 + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.1 + 0.5);
            
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.5);
        });
    } catch(e) {}
}

let bgmContext: AudioContext;
let nextNoteTime: number;
let currentNote = 0;
let isPlayingBgm = false;
let timerID: number | undefined;

const welcomeMelody = [
  523.25, 523.25, 659.25, 659.25,
  783.99, 783.99, 659.25, 0,
  587.33, 587.33, 659.25, 659.25,
  523.25, 0, 0, 0
];

const menuMelody = [
  523.25, 0, 659.25, 0, 
  783.99, 0, 1046.50, 0,
  783.99, 659.25, 523.25, 0
];

const gameMelody = [
  392.00, 329.63, 392.00, 329.63,
  440.00, 392.00, 349.23, 329.63,
  293.66, 0, 392.00, 0
];

let activeMelody = welcomeMelody;

const tempo = 120; // BPM
const lookahead = 25.0; // ms
const scheduleAheadTime = 0.1; // seconds

function scheduleNote(noteNumber: number, time: number) {
  if (activeMelody[noteNumber] !== 0) {
    const osc = bgmContext.createOscillator();
    const gain = bgmContext.createGain();
    
    osc.type = 'triangle';
    osc.frequency.value = activeMelody[noteNumber];
    
    gain.gain.setValueAtTime(0.04, time); // Volume very low for background
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);
    
    osc.connect(gain);
    gain.connect(bgmContext.destination);
    
    osc.start(time);
    osc.stop(time + 0.2);
  }
}

function nextNote() {
  const secondsPerBeat = 60.0 / tempo;
  nextNoteTime += secondsPerBeat * 0.5; // Eighth notes
  currentNote++;
  if (currentNote >= activeMelody.length) {
    currentNote = 0;
  }
}

function scheduler() {
  while (nextNoteTime < bgmContext.currentTime + scheduleAheadTime) {
    scheduleNote(currentNote, nextNoteTime);
    nextNote();
  }
  if (isPlayingBgm) {
    timerID = window.setTimeout(scheduler, lookahead);
  }
}

export const startBgm = (theme: string = 'welcome') => {
  if (theme === 'welcome') activeMelody = welcomeMelody;
  else if (theme === 'menu') activeMelody = menuMelody;
  else activeMelody = gameMelody;

  if (isPlayingBgm) return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    bgmContext = new AudioContext();
    isPlayingBgm = true;
    currentNote = 0;
    nextNoteTime = bgmContext.currentTime + 0.05;
    scheduler();
  } catch (e) {
    console.log(e);
  }
};

export const stopBgm = () => {
  isPlayingBgm = false;
  if (timerID) window.clearTimeout(timerID);
  if (bgmContext) {
    bgmContext.close();
  }
};

