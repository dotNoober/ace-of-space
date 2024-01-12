import { Game } from "./classes.js";
import { renderText, createGrid } from "./functions.js";
import { SFX } from "./sounds-effects.js";
import { KEY_STATUS, KEY_CODES } from "./user-input.js";


function mainLoop() {
  context.clearRect(0, 0, game.canvasWidth, window.gameHeight);

  game.FSM.execute();

  if (KEY_STATUS.g) {
    context.beginPath();
    for (var i = 0; i < gridWidth; i++) {
      context.moveTo(i * GRID_SIZE, 0);
      context.lineTo(i * GRID_SIZE, window.gameHeight);
    }
    for (var j = 0; j < gridHeight; j++) {
      context.moveTo(0, j * GRID_SIZE);
      context.lineTo(game.canvasWidth, j * GRID_SIZE);
    }
    context.closePath();
    context.stroke();
  }

  game.thisFrame = Date.now();
  game.elapsed = game.thisFrame - game.lastFrame;
  game.lastFrame = game.thisFrame;
  game.delta = game.elapsed / 30;

  for (i = 0; i < game.sprites.length; i++) {

    game.sprites[i].run(game.delta);

    if (game.sprites[i].reap) {
      game.sprites[i].reap = false;
      game.sprites.splice(i, 1);
      i--;
    }
  }

  // score
  var score_text = '' + game.score;
  renderText(score_text, 20, window.gameWidth - 14 * score_text.length, 20);

  // extra dudes
  for (i = 0; i < game.lives; i++) {
    window.context.save();
    game.extraDude.x = window.gameWidth - (8 * (i + 1));
    game.extraDude.y = 32;
    game.extraDude.configureTransform();
    game.extraDude.draw();
    window.context.restore();
  }

  if (game.showFramerate) {
    renderText('' + game.avgFramerate, 24, window.gameWidth - 38, window.gameHeight - 2);
  }

  game.frameCount++;
  game.elapsedCounter += game.elapsed;
  if (game.elapsedCounter > 1000) {
    game.elapsedCounter -= 1000;
    game.avgFramerate = game.frameCount;
    game.frameCount = 0;
  }

  if (game.paused) {
    renderText('PAUSED', 72, window.gameWidth / 2 - 160, 120);
  } else {
    requestAnimationFrame(mainLoop);
  }
}

export const GRID_SIZE = 60;

const canvas = document.getElementById("canvas");
window.gameWidth = canvas.width;
window.gameHeight = canvas.height;
window.context = canvas.getContext("2d");
window.context.strokeStyle = "white";
window.context.fillStyle = "white"

const gridWidth = Math.round(window.gameWidth / GRID_SIZE);
const gridHeight = Math.round(window.gameHeight / GRID_SIZE);
window.grid = createGrid(gridWidth, gridHeight, window.gameWidth, window.gameHeight);


export const game = new Game();

mainLoop();

window.addEventListener('keydown', function (e) {
  switch (KEY_CODES[e.code]) {
    case 'f': // show framerate
      game.showFramerate = !game.showFramerate;
      break;
    case 'p': // pause
      game.paused = !game.paused;
      if (!game.paused) {
        // start up again
        game.lastFrame = Date.now();
        mainLoop();
      }
      break;
    case 'm': // mute
      SFX.muted = !SFX.muted;
      break;
  }
});

// vim: fdl=0
