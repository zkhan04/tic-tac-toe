// DOM elements
const gameDisplay = document.querySelector('.game-board');
const gameResultField = document.querySelector('.result');
const restartButton = document.querySelector('.restart');

// event listeners
for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
        const tile = document.createElement('div');
        tile.addEventListener('click', (event) => {
            gameBoard.play(event, i, j);
        })
        gameDisplay.appendChild(tile);
    }
}
restartButton.addEventListener('click', () => gameBoard.reset());

const gameBoard = (function createGameBoard(){
    // state variables
    let board, currentCharacter, turns, gameRunning;
    reset();

    // win patterns 
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]]
    ];
    
    // plays the selected move and edits the appropriate DOM element
    function play(event, row, column){
        if (board[row][column] === '' && gameRunning){
            turns += 1;
            event.target.textContent = currentCharacter;
            board[row][column] = currentCharacter;
            checkForWin();

            // switches character
            currentCharacter = currentCharacter === 'x' ? 'o' : 'x';
        } 
    }

    // checks a given win pattern
    function checkWinPattern(winPattern){
        let [r, c] = winPattern[0];
        const char = board[r][c];

        // returns false if any cells don't match first one
        for(let i = 1; i < winPattern.length; i++){
            [r, c] = winPattern[i];
            if (board[r][c] != char) return false;
        }

        if (char != '') return true;
    }

    // checks across all win patterns, displays message if a player wins
    function checkForWin(){
        for (let i = 0; i < winPatterns.length; i++){
            if (checkWinPattern(winPatterns[i])){
                gameResultField.textContent = currentCharacter + " wins!";
                gameRunning = false;
                return;
            }
        }
        if (turns === 9) gameResultField.textContent = 'tie!'
    }

    // resets/initializes the game board, clears the result
    function reset(){
        turns = 0;
        board = [['', '', ''], ['', '', ''], ['', '', '']];
        currentCharacter = 'x';
        gameRunning = true;
        gameDisplay.querySelectorAll("*").forEach((tile) => {
            tile.textContent = '';
        })
        gameResultField.textContent = '';
    }

    return {play, reset};
})();