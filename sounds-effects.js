class soundEffects {
  constructor() {
    this.sfx = {
      laser: new Audio('sound/584193__unfa__weapons-plasma-shot-01.flac'),
      explosion: new Audio('sound/584169__unfa__explosion-01.flac'),
      engineStart: new Audio('sound/584182__unfa__thrust-start.flac'),
      engineLoop: new Audio('sound/584181__unfa__thrust-loop.flac'),
      engineEnd: new Audio('sound/584180__unfa__thrust-end.flac'),
    };

    for (const sfxKey in this.sfx) {
      if (Object.hasOwnProperty.call(this.sfx, sfxKey)) {
        this.initializeAudio(sfxKey);
      }
    }

    this.muted = false;
  }

  laser() {
    return this.sfx.laser();
  }

  explosion() {
    return this.sfx.explosion();
  }

  engineStart() {
    if (!this.muted) {
      return this.sfx.engineStart();
    }
  }

  initializeAudio(sfxKey) {
    const audio = this.sfx[sfxKey];
    audio.muted = true;
    audio.play();

    this.sfx[sfxKey] = () => {
      if (!this.muted) {
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