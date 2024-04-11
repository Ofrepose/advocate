
const useAiPlayer = (boardState, setBoardState, setCurrentPlayer, calculateWinner, setWinner, currentPlayer, easyMode) => {

  const makeAiMove = () => {
    const size = boardState.length;
    const opponent = currentPlayer === 'X' ? 'O' : 'X';

    if (!easyMode) {
      // This will check for possible winning moves, if found - cpu will take that tile.
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (boardState[i][j] === '') {
            const newBoard = [...boardState];
            newBoard[i][j] = currentPlayer;
            if (calculateWinner(newBoard) === currentPlayer) {
              setBoardState(newBoard);
              setCurrentPlayer(null);
              setWinner(currentPlayer);
              return;
            }
            // Reset the move for checking other positions
            newBoard[i][j] = '';
          }
        }
      }

      // Check for possible opponent winning moves, if found, will take tile to block
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (boardState[i][j] === '') {
            const newBoard = [...boardState];
            newBoard[i][j] = opponent;
            if (calculateWinner(newBoard) === opponent) {
              newBoard[i][j] = currentPlayer;
              setBoardState(newBoard);
              setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
              return;
            }
            // Reset the move for checking other positions
            newBoard[i][j] = '';
          }
        }
      }
    }

    // Take Random tile if no winning or blockable move
    let rowIndex, colIndex;
    do {
      rowIndex = Math.floor(Math.random() * size);
      colIndex = Math.floor(Math.random() * size);
    } while (boardState[rowIndex][colIndex] !== '');

    const newBoard = [...boardState];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoardState(newBoard);
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setCurrentPlayer(null);
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  return makeAiMove;

};

export default useAiPlayer;