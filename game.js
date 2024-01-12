import { Game } from "./classes.js";
import { mainLoop } from "./functions.js";
import { createGrid } from "./functions.js";

export const GRID_SIZE = 60;

const canvas = document.getElementById("canvas");
window.gameWidth = canvas.width;
window.gameHeight = canvas.height;
window.context = canvas.getContext("2d");
window.context.strokeStyle = "white";
window.context.fillStyle = "white"

export const gridWidth = Math.round(window.gameWidth / GRID_SIZE);
export const gridHeight = Math.round(window.gameHeight / GRID_SIZE);
window.grid = createGrid(gridWidth, gridHeight, window.gameWidth, window.gameHeight);


export const game = new Game();

mainLoop();

// vim: fdl=0
