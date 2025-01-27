const boardSize = 25; // Total number of cells (5x5 grid)
let diceValue = 1;
let currentPlayer = 1; // Player 1 starts
const playerPositions = { 1: 1, 2: 1 }; // Player positions on the board

// Create the board dynamically
const board = document.getElementById("board");
for (let i = 1; i <= boardSize; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = `cell-${i}`;
  cell.innerText = i; // Number the cells
  board.appendChild(cell);
}

// Roll dice functionality
document.getElementById("roll-dice").addEventListener("click", function () {
  diceValue = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
  document.getElementById("dice-value").innerText = diceValue;
  moveToken();
});

// Move token functionality
function moveToken() {
  const tokenId = `player${currentPlayer}-token`;
  const token = document.getElementById(tokenId);

  // Calculate new position
  playerPositions[currentPlayer] += diceValue;

  if (playerPositions[currentPlayer] > boardSize) {
    playerPositions[currentPlayer] = boardSize; // Stay within bounds
  }

  // Move the token visually
  const targetCell = document.getElementById(`cell-${playerPositions[currentPlayer]}`);
  if (targetCell) {
    const rect = targetCell.getBoundingClientRect();
    token.style.left = `${rect.left + window.scrollX}px`;
    token.style.top = `${rect.top + window.scrollY}px`;
  }

  // Check for a win
  if (playerPositions[currentPlayer] === boardSize) {
    alert(`Player ${currentPlayer} wins!`);
    resetGame();
    return;
  }

  // Switch turn to the next player
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  document.getElementById("current-player").innerText = currentPlayer;
}

// Reset the game
function resetGame() {
  playerPositions[1] = 1;
  playerPositions[2] = 1;
  currentPlayer = 1;

  document.getElementById("player1-token").style.left = "0px";
  document.getElementById("player1-token").style.top = "0px";

  document.getElementById("player2-token").style.left = "0px";
  document.getElementById("player2-token").style.top = "0px";

  document.getElementById("current-player").innerText = currentPlayer;
}
