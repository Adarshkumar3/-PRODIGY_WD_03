let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let winningCombination = null;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

function handleClick(cellIndex) {
    if (!gameActive || board[cellIndex] !== '') return;

    board[cellIndex] = currentPlayer;
    document.getElementById(cellIndex).innerText = currentPlayer;
    document.getElementById('moveSound').play();
    
    if (checkWin()) {
        document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
        document.getElementById('winSound').play();
        gameActive = false;
        highlightWinningCells();
        document.getElementById('playAgainBtn').style.display = 'inline-block';
        return;
    }
    
    if (checkDraw()) {
        document.getElementById('status').innerText = "It's a draw!";
        gameActive = false;
        document.getElementById('playAgainBtn').style.display = 'inline-block';
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = `Player ${currentPlayer}'s Turn`;

    if (currentPlayer === 'O') {
        makeAIMove();
    }
}

function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winningCombination = combination;
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function makeAIMove() {
    let emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let aiMove = emptyCells[randomIndex];

    setTimeout(() => handleClick(aiMove), 1000);
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    winningCombination = null;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winning-cell');
    });
    document.getElementById('status').innerText = `Player ${currentPlayer}'s Turn`;
    document.getElementById('playAgainBtn').style.display = 'none';
}

function playAgain() {
    resetGame();
    document.getElementById('playAgainBtn').style.display = 'none';
}

function highlightWinningCells() {
    if (winningCombination) {
        for (let index of winningCombination) {
            document.getElementById(index).classList.add('winning-cell');
        }
    }
}

// Generate the game board dynamically
window.onload = function() {
    let boardContainer = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        cell.addEventListener('click', () => handleClick(i));
        boardContainer.appendChild(cell);
    }
};
