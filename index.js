window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', '']
    let currPlayer = 'X';
    let isGameActive = true;

    const XWin = 'XWin'
    const OWin = 'OWin'
    const tie = 'tie'

    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation(){
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = win[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === ''){
                continue;
            }
            if (a === b && b === c){
                roundWon = true;
                break;
            }
        }
    if(roundWon){
            announce(currPlayer === 'X' ? XWin : OWin);
            isGameActive = false;
            return;
        }
    if(!board.includes(''))
            announce(tie);
    };

    const announce = (type) =>{
        switch(type){
            case OWin:
                announcer.innerHTML = 'Player <span class = "playerO">O</span> is the winner!';
                break;
            case XWin:
                announcer.innerHTML = 'Player <span class = "playerX">X</span> is the winner!';
                break;
            case tie:
                announcer.innerText = 'Tied!'
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) =>{
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }else{
            return true;
        }
    };

    const updateBoard = (index) => {
        board[index] = currPlayer;
    };

    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${currPlayer}`);
        currPlayer = currPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currPlayer;
        playerDisplay.classList.add(`player${currPlayer}`);
    };

    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currPlayer;
            tile.classList.add('player${currPlayer}');
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const ResetBoard = () =>{
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currPlayer === 'O'){
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('PlayerX');
            tile.classList.remove('PlayerO');
        })
    }

    tiles.forEach((tile, index) =>{
        tile.addEventListener('click', () => userAction(tile, index));
    });
    resetButton.addEventListener('click', ResetBoard);
});
