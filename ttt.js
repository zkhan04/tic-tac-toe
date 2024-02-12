gameBoard = (function createGameBoard(){
    const board = [['', '', ''], ['', '', ''], ['', '', '']];
    let gameComplete = false;
    let currentCharacter = 'x';

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
    
    function play(row, column){
        if (board[row][column] === ''){
            board[row][column] = currentCharacter;
            if (currentCharacter === 'x') currentCharacter = 'o';
            else currentCharacter = 'x';
        } 
        else console.log('KYS!!');
    }

    function readGameMove(){
        let [r, c] = prompt(currentCharacter + ": Enter the row and column").split(' ');
        play(r, c);
    }

    function runGame(){
        while (!gameComplete){
            readGameMove();
            displayBoard();
            gameComplete = checkForWin();
        }
        console.log(gameComplete + ' wins');
    }

    function displayBoard(){
        board.forEach((row) => console.log(row));
    }

    function checkWinPattern(winPattern){
        let [r, c] = winPattern[0];
        let char;
        if (board[r][c] === '') {
            return false;
        } else char = board[r][c];
        for(let i = 1; i < winPattern.length; i++){
            [r, c] = winPattern[i];
            if (board[r][c] != char) {
                return false;
            } 
        }
        console.log(winPattern);
        return char;
    }

    function checkForWin(){
        for (let i = 0; i < winPatterns.length; i++){
            const result = checkWinPattern(winPatterns[i]);
            if (result != false) return result;
        }
        return false;
    }

    return {runGame};
})();