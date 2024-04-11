import { useState, useEffect, useRef } from 'react';
import useAiPlayer from './useAiPlayer';
import {
  NOTIFICATION_MSG_LENGTH,
  NOTIFICATION_TILE_FULL,
  NOTIFICATION_NOT_TURN,
  NOTIFICATION_DONE_WON,
  NOTIFICATION_DONE_LOST
} from '../../constants/notificationMessages';

const initialBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];



const useTicTacToeGame = () => {
  const [size, setSize] = useState(3);
  const [boardState, setBoardState] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(Math.round(Math.random()) === 0 ? 'X' : 'O');
  const [winner, setWinner] = useState(null);
  const [message, setMessage] = useState('');
  const [playerCount, setPlayerCount] = useState(1);
  const [easyMode, setEasyMode] = useState(false);

  const timeoutRef = useRef(null);

  const calculateWinner = (board) => {
    // Possible winning combos
    const winningLines = [
      // Horizontal
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Vertical
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonal
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
  
    // Check each winning line to see if winner
    for (let line of winningLines) {
      const [a, b, c] = line;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;
  
      // Check if all three cells in the line have same non-empty value
      if (
        board[rowA][colA] &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] === board[rowC][colC]
      ) {
        // Return the winning player (X or O)
        return board[rowA][colA];
      }
    }
  
    // Check for tie
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        // If any cell is empty, game is not over
        if (!board[row][col]) {
          return null;
        }
      }
    }
  
    // If no winner is found and there are no empty cells, it's a tie
    return 'Tie';
  };

  const makeAiMove = useAiPlayer(boardState, setBoardState, setCurrentPlayer, calculateWinner, setWinner, currentPlayer, easyMode);

  // Gives pause to AI Move to make it feel more natural
  // Using ref here to cancel out the timeout execution should a game restart() take place.
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (currentPlayer === 'O' || playerCount === 0 && !winner) {
      timeoutRef.current = setTimeout(() => {
        makeAiMove();
      }, Math.floor(Math.random() * 4000));
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentPlayer, makeAiMove, playerCount]);

  // Clears out the notification message after x (2.5) seconds 
  useEffect(() => {
    if (message) {
      let timeoutId;
      timeoutId = setInterval(async () => {
        setMessage('');
      }, 2500);

      return () => clearInterval(timeoutId);
    }
  }, [message]);

  

  // Restarts game and sets all values back to default
  const restart = () => {
    setPlayerCount(1);
    clearTimeout(timeoutRef.current);
    setBoardState(() => [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setCurrentPlayer(Math.round(Math.random()) === 0 ? 'X' : 'O');
    setWinner(null);
  }

  const handleCellClick = (rowIndex, colIndex) => {
    // Array index for message notifcation(s) found in constants dir.
    const randomizer = Math.floor(Math.random() * NOTIFICATION_MSG_LENGTH);

    // Tile is occupied - notify player
    if (boardState[rowIndex][colIndex] !== '' && !winner) {
      setMessage(NOTIFICATION_TILE_FULL[randomizer]);
      return;
    }
    // Game already over - notify player
    if (winner) {
      setMessage(winner === 'X' ? NOTIFICATION_DONE_WON[randomizer] : NOTIFICATION_DONE_LOST[randomizer]);
      return;
    }
    // Its literally not even your turn though... 
    if (currentPlayer !== 'X') {
      setMessage(NOTIFICATION_NOT_TURN[randomizer]);
      return;
    }

    // Set new board state and check if player won
    const newBoard = [...boardState];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoardState(newBoard);
    const newWinner = calculateWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer('O');
    }

  };

  return {
    size,
    setSize,
    restart,
    boardState,
    currentPlayer,
    winner,
    handleCellClick,
    message,
    playerCount,
    setPlayerCount,
    setCurrentPlayer,
    easyMode,
    setEasyMode,
    calculateWinner
  };
};

export default useTicTacToeGame;