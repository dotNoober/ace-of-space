class soundEffects {
  constructor() {
    this.sfx = {
      laser: new Audio('sound/584193__unfa__weapons-plasma-shot-01.flac'),
      explosion: new Audio('sound/584169__unfa__explosion-01.flac')
    };

    // Preload and pre-mute audio
    for (const sfxKey in this.sfx) {
      if (Object.hasOwnProperty.call(this.sfx, sfxKey)) {
        this.initializeAudio(sfxKey);
      }
    }

    // Pre-mute audio
    this.sfx.muted = true;
  }

  initializeAudio(sfxKey) {
    const audio = this.sfx[sfxKey];
    audio.muted = true;
    audio.play();

    this.sfx[sfxKey] = () => {
      if (!this.sfx.muted) {
        audio.muted = false;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
      return audio;
    };
  }
}
export const SFX = new soundEffects();