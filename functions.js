import { GridNode } from "./classes.js";

export function saveHighScore(score) {
  // Get current date/time
  const currentDate = new Date();

  // Create a high score object
  const highScore = {
    datetime: currentDate.toLocaleString(), // Convert date to a readable string
    score: score
  };

  // Get existing high scores from localStorage or initialize an empty array
  let highScores = getHighScores();

  // Add the new high score to the array
  highScores.push(highScore);

  // Sort high scores in descending order based on the score
  highScores.sort((a, b) => b.score - a.score);

  // Only keep the top 10 high scores
  highScores = highScores.slice(0, 10);

  // Save the updated high scores array back to localStorage
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function getHighScores() {
  // Get high scores from localStorage or return an empty array if not present
  return JSON.parse(localStorage.getItem('highScores')) || [];
}

export function renderHighScores() {
  let row = 80;
  window.context.save();
  window.context.globalAlpha = 0.1;
  window.context.fillRect(window.gameWidth - 380, 40, 340, window.gameHeight - 80);
  window.context.globalAlpha = 1;
  renderText('>> High Scores <<', 30, window.gameWidth - 300, row);
  getHighScores().forEach((score) => {
    row += 40;
    renderText(score.score, 28, window.gameWidth - 340, row);
    renderText(score.datetime, 22, window.gameWidth - 220, row);
  });
  window.context.restore();
}

export function renderText(text, size, x, y) {
  window.context.save();

  window.context.font = `${size}px Obti Sans`; // Set the font size and type
  window.context.fillText(text, x, y); // Draw filled text


  window.context.restore();
}

export function createGrid(gridWidth, gridHeight, gameWidth, gameHeight) {
  const grid = new Array(gridWidth);

  for (let i = 0; i < gridWidth; i++) {
    grid[i] = new Array(gridHeight);
    for (let j = 0; j < gridHeight; j++) {
      grid[i][j] = new GridNode();
    }
  }

  // set up the positional references
  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridHeight; j++) {
      const node = grid[i][j];
      node.north = grid[i][(j === 0) ? gridHeight - 1 : j - 1];
      node.south = grid[i][(j === gridHeight - 1) ? 0 : j + 1];
      node.west = grid[(i === 0) ? gridWidth - 1 : i - 1][j];
      node.east = grid[(i === gridWidth - 1) ? 0 : i + 1][j];
    }
  }

  // set up borders
  for (let i = 0; i < gridWidth; i++) {
    grid[i][0].dupe.vertical = gameHeight;
    grid[i][gridHeight - 1].dupe.vertical = -gameHeight;
  }

  for (let j = 0; j < gridHeight; j++) {
    grid[0][j].dupe.horizontal = gameWidth;
    grid[gridWidth - 1][j].dupe.horizontal = -gameWidth;
  }

  return grid;
}

