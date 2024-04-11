import { useState } from 'react';
import './App.css';
import Board from './components/board/Index';
import Header from './components/ui/Header';
import Notifications from './components/ui/Notifications';
import Button from './components/ui/clickables/Button';
import useTicTacToeGame from './logic/hooks/useTicTacToeGame';
import GameInfo from './components/ui/GameInfo';
import Confetti from 'react-confetti'
import GameConfig from './components/ui/gameConfig/Index';
import EasyMode from './components/ui/EasyMode';


function App() {
  const [configOpen, setConfigOpen] = useState(true);
  const { size, restart, boardState, currentPlayer, winner, handleCellClick, message, playerCount, setPlayerCount, easyMode, setEasyMode } = useTicTacToeGame();

  return (
    <div className="bg-gray-300 min-h-screen max-w-screen p-4 font-sans overflow-hidden">
      <Header />
      {configOpen ?
        (
          <GameConfig
            setConfigOpen={setConfigOpen}
            setPlayerCount={setPlayerCount}
          />

        ) :
        (
          <div className='lg:w-1/2 w-full mx-auto flex flex-wrap'>
            <GameInfo
              currentPlayer={currentPlayer}
              winner={winner}
              show={playerCount}
            />
            <Board
              size={size}
              boardState={boardState}
              handleClick={handleCellClick}
              currentPlayer={currentPlayer}
            />
            <Button
              extra={'mt-10'}
              handleClick={() => {
                restart();
                setConfigOpen(true);
              }}
              message={winner && 'Restart' || 'Start Over'}
            />
            <Notifications
              message={message}
              show={playerCount}
            />
            <EasyMode 
              easyMode={easyMode}
              setEasyMode={setEasyMode}
            />
          </div>
        )}
      {winner === 'X' && playerCount ? (
        <Confetti />
      ) : ('')}

    </div>
  );
}

export default App;
