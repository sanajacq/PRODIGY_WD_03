const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const checkDraw = () => {
    return board.every(cell => cell !== '');
};

const handleResult = () => {
    const winner = checkWin();
    if (winner) {
        statusElement.textContent = `Player ${winner} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        statusElement.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const handleClick = (index) => {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        handleResult();
    }
};

const restartGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = cell.getAttribute('data-cell-index');
        handleClick(cellIndex);
    });
});

restartButton.addEventListener('click', restartGame);

handleResult();
