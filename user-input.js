function initializeKeyStatus() {
  // Initialize key status object with a default keyDown value
  const keyStatus = { keyDown: false };
  // Iterate through each key code and initialize its status in the keyStatus object
  for (const code in KEY_CODES) {
    keyStatus[KEY_CODES[code]] = false;
  }
  return keyStatus;
}

function handleTouch(e) {
  if (e.type !== 'touchend') {
    Object.keys(KEY_STATUS).forEach(function (k) {
      KEY_STATUS[k] = false;
    });
  }

  const touches = e.type === 'touchend' ? e.changedTouches : e.touches;

  for (let i = 0; i < touches.length; i++) {
    const ele = document.elementFromPoint(touches[i].pageX, touches[i].pageY);
    KEY_STATUS[ele.id] = (e.type !== 'touchend');
  }
}

function preventDefault(e) {
  e.preventDefault();
}

const KEY_CODES = {
  'Space': 'space', //shoot
  'ArrowLeft': 'left', //rotate left
  'ArrowUp': 'up', //gas
  'ArrowRight': 'right', //rotate right
  'ArrowDown': 'down', //
  'KeyF': 'f', //toggle fps display
  'KeyG': 'g', //hold to display grid
  'KeyH': 'h', //
  'KeyM': 'm', //toggle mute
  'KeyP': 'p' //toggle pause
}

const KEY_STATUS = initializeKeyStatus();

const leftControls = document.getElementById('left-controls');
const rightControls = document.getElementById('right-controls');

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

if (isTouchDevice) {
    leftControls.style.display = 'block';
    rightControls.style.display = 'block';
}

[leftControls, rightControls].forEach(function (control) {
  control.addEventListener('touchstart', handleTouch, { passive: false });
  control.addEventListener('touchmove', handleTouch, { passive: false });
  control.addEventListener('touchend', handleTouch, { passive: false });
});

['gesturestart', 'gesturechange', 'gestureend', 'touchstart', 'touchmove', 'touchend'].forEach(function (event) {
  document.addEventListener(event, preventDefault, { passive: false });
});

document.addEventListener('touchstart', function () {
  window.gameStart = true;
}, { passive: false });

window.addEventListener('keydown', (e) => {
  KEY_STATUS.keyDown = true;
  const keyName = KEY_CODES[e.code];
  if (keyName) {
    e.preventDefault();
    KEY_STATUS[keyName] = true;
  }
})

window.addEventListener('keyup', (e) => {
  KEY_STATUS.keyDown = false;
  const keyName = KEY_CODES[e.code];
  if (keyName) {
    e.preventDefault();
    KEY_STATUS[keyName] = false;
  }
})

export { KEY_CODES, KEY_STATUS }
