// Canvas Asteroids
//
// Copyright (c) 2010 Doug McInnes
//

import { Game, GridNode, Ship, Bullet, BigAlien } from "./classes.js";
import { renderText } from "./functions.js";
import { SFX } from "./sounds-effects.js";
import { KEY_STATUS, KEY_CODES } from "./user-input.js";

export const GRID_SIZE = 60;

export const game = new Game();

//main code 

const canvas = document.getElementById("canvas");
window.gameWidth = canvas.width;
window.gameHeight = canvas.height;
window.context = canvas.getContext("2d");
window.context.strokeStyle = "white";
window.context.fillStyle = "white";

const gridWidth = Math.round(window.gameWidth / GRID_SIZE);
const gridHeight = Math.round(window.gameHeight / GRID_SIZE);
window.grid = new Array(gridWidth);
for (let i = 0; i < gridWidth; i++) {
  grid[i] = new Array(gridHeight);
  for (let j = 0; j < gridHeight; j++) {
    grid[i][j] = new GridNode();
  }
}

// set up the positional references
for (let i = 0; i < gridWidth; i++) {
  for (let j = 0; j < gridHeight; j++) {
    var node = grid[i][j];
    node.north = grid[i][(j == 0) ? gridHeight - 1 : j - 1];
    node.south = grid[i][(j == gridHeight - 1) ? 0 : j + 1];
    node.west = grid[(i == 0) ? gridWidth - 1 : i - 1][j];
    node.east = grid[(i == gridWidth - 1) ? 0 : i + 1][j];
  }
}

// set up borders
for (let i = 0; i < gridWidth; i++) {
  grid[i][0].dupe.vertical = window.gameHeight;
  grid[i][gridHeight - 1].dupe.vertical = -window.gameHeight;
}

for (let j = 0; j < gridHeight; j++) {
  grid[0][j].dupe.horizontal = game.canvasWidth;
  grid[gridWidth - 1][j].dupe.horizontal = -game.canvasWidth;
}


var ship = new Ship();

ship.x = window.gameWidth / 2;
ship.y = window.gameHeight / 2;

game.sprites.push(ship);

ship.bullets = [];
for (var i = 0; i < 10; i++) {
  var bull = new Bullet();
  ship.bullets.push(bull);
  game.sprites.push(bull);
}
game.ship = ship;

var bigAlien = new BigAlien();
bigAlien.setup();
game.sprites.push(bigAlien);
game.bigAlien = bigAlien;

var extraDude = new Ship();
extraDude.scale = 0.6;
extraDude.visible = true;
extraDude.preMove = null;
extraDude.children = [];

var i, j = 0;

var paused = false;
var showFramerate = false;
var avgFramerate = 0;
var frameCount = 0;
var elapsedCounter = 0;

var lastFrame = Date.now();
var thisFrame;
var elapsed;
var delta;

var canvasNode = canvas[0];


var mainLoop = function () {
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

  thisFrame = Date.now();
  elapsed = thisFrame - lastFrame;
  lastFrame = thisFrame;
  delta = elapsed / 30;

  for (i = 0; i < game.sprites.length; i++) {

    game.sprites[i].run(delta);

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
    context.save();
    extraDude.x = window.gameWidth - (8 * (i + 1));
    extraDude.y = 32;
    extraDude.configureTransform();
    extraDude.draw();
    context.restore();
  }

  if (showFramerate) {
    renderText('' + avgFramerate, 24, window.gameWidth - 38, window.gameHeight - 2);
  }

  frameCount++;
  elapsedCounter += elapsed;
  if (elapsedCounter > 1000) {
    elapsedCounter -= 1000;
    avgFramerate = frameCount;
    frameCount = 0;
  }

  if (paused) {
    renderText('PAUSED', 72, window.gameWidth / 2 - 160, 120);
  } else {
    requestAnimationFrame(mainLoop, canvasNode);
  }
};

mainLoop();

window.addEventListener('keydown', function (e) {
  switch (KEY_CODES[e.code]) {
    case 'f': // show framerate
      showFramerate = !showFramerate;
      break;
    case 'p': // pause
      paused = !paused;
      if (!paused) {
        // start up again
        lastFrame = Date.now();
        mainLoop();
      }
      break;
    case 'm': // mute
      SFX.muted = !SFX.muted;
      break;
  }
});

// vim: fdl=0
