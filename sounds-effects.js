class soundEffects {
  constructor() {
    this.sfx = {
      bg: new Audio('sound/bg/Contact_With_The_Unknown.mp3'),
      laser: new Audio('sound/sfx/weapons-plasma-shot.flac'),
      explosion: new Audio('sound/sfx/explosion.flac'),
      engine: new Audio('sound/sfx/thrust.flac'),
    };

    for (const sfxKey in this.sfx) {
      if (Object.hasOwnProperty.call(this.sfx, sfxKey)) {
        this.initializeAudio(sfxKey);
      }
    }

    this.muted = false;

  }

  bgMusic() {
    return this.sfx.bg();
  }

  laser() {
    return this.sfx.laser();
  }

  explosion() {
    return this.sfx.explosion();
  }

  engine() {
    return this.sfx.engine();
  }

  initializeAudio(sfxKey) {
    const audio = this.sfx[sfxKey];

    this.sfx[sfxKey] = () => {
      if (!this.muted) {
        audio.muted = false;
        audio.currentTime = 0;
        audio.play();
      }
      return audio;
    };
  }
}
export const SFX = new soundEffects();