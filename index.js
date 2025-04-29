// script.js
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isAIEnabled = true; // Toggle AI opponent

// Handle click event for user
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!board[index] && !checkWinner() && currentPlayer === 'X') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWinner()) {
                statusDisplay.textContent = `${currentPlayer} wins!`;
            } else if (board.every(cell => cell)) {
                statusDisplay.textContent = "It's a draw!";
            } else {
                currentPlayer = 'O';
                statusDisplay.textContent = `${currentPlayer}'s turn`;
                if (isAIEnabled) aiMove(); // Let AI make its move
            }
        }
    });
});

// AI logic to make a random move
function aiMove() {
    setTimeout(() => {
        if (!checkWinner()) {
            const availableCells = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
            const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
            board[randomIndex] = currentPlayer;
            cells[randomIndex].textContent = currentPlayer;
            if (checkWinner()) {
                statusDisplay.textContent = `${currentPlayer} wins!`;
            } else if (board.every(cell => cell)) {
                statusDisplay.textContent = "It's a draw!";
            } else {
                currentPlayer = 'X';
                statusDisplay.textContent = `${currentPlayer}'s turn`;
            }
        }
    }, 500); // Delay for realistic effect
}

// Reset functionality
resetButton.addEventListener('click', () => {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
});

// Check for winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === currentPlayer)
    );
}
