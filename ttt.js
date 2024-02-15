const gameBoard = (function createGameBoard(){
    // state variables
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    let gameComplete = false;
    let currentCharacter = 'x';

    // win patterns (there are only 8 so i couldve jus hard coded them
    // but im a cs major so I need to automate everything LOL)
    const winPatterns = (function generateWinPatterns(){
        const winPatterns = []

        // row and column patterns
        for (let i = 0; i < 3; i++){
            const rowPattern = [];
            const columnPattern = [];
            for (let j = 0; j < 3; j++){
                const rowTile = [i, j]
                const columnTile = [j, i];
                rowPattern.push(rowTile);
                columnPattern.push(columnTile);
            }
            winPatterns.push(rowPattern, columnPattern);
        }

        // diagonal patterns
        const mainDiagonal = [];
        const otherDiagonal = [];
        for (let i = 0; i < 3; i++){
            mainTile = [i, i];
            otherTile = [i, 2-i];
            mainDiagonal.push(mainTile);
            otherDiagonal.push(otherTile);
        }
        winPatterns.push(mainDiagonal, otherDiagonal);

        return winPatterns;
    })();
    
    // plays the selected move and edits the appropriate DOM element
    function play(event, row, column){
        if (board[row][column] === ''){
            event.target.textContent = currentCharacter;
            board[row][column] = currentCharacter;
            checkForWin();

            // switches character
            if (currentCharacter === 'x') currentCharacter = 'o';
            else currentCharacter = 'x';
        } 
    }

    // checks a given win pattern
    function checkWinPattern(winPattern){
        let [r, c] = winPattern[0];
        let char;

        // returns false if first cell empty
        if (board[r][c] === '') {
            return false;
        } else char = board[r][c];

        // returns false if any cells don't match first one
        for(let i = 1; i < winPattern.length; i++){
            [r, c] = winPattern[i];
            if (board[r][c] != char) {
                return false;
            } 
        }
    }

    // checks across all win patterns, displays message if a player wins
    function checkForWin(){
        for (let i = 0; i < winPatterns.length; i++){
            const result = checkWinPattern(winPatterns[i]);
            if (result != false){
                gameResultField.textContent = currentCharacter + " wins!";
            }
        }
    }

    // resets the game board and clears the result
    function reset(){
        console.log('called');
        board = Array.from({ length: 3 }, () => Array(3).fill(''));
        currentCharacter = 'x';
        Array.from(gameDisplay.getElementsByTagName("*")).forEach((tile) => {
            tile.textContent = '';
        })
        gameResultField.textContent = '';
    }

    // only public methods
    return {play, reset};
})();

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
restartButton.addEventListener('click', (event) => gameBoard.reset());
