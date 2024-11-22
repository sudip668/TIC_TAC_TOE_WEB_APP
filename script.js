// script.js

const gameBoard = document.getElementById("gameBoard");
const gameStatus = document.getElementById("gameStatus");
const restartButton = document.getElementById("restartButton");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
];

// Initialize the game board
function createBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.setAttribute("data-index", index);
    cellElement.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cellElement);
  });
}

// Handle cell click
function handleCellClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  if (board[cellIndex] !== "" || !gameActive) return;

  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  if (checkWin()) {
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    gameStatus.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a win
function checkWin() {
  return winningConditions.some((combination) => {
    return combination.every((index) => board[index] === currentPlayer);
  });
}

// Restart the game
restartButton.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  gameStatus.textContent = `Player X's turn`;
  createBoard();
});

// Initialize the game
createBoard();
