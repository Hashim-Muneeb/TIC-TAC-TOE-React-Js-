import { useState } from "react";
import Log from "./components/Log";
import Player from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const newTurn = {
        square: { row: rowIndex, col: colIndex },
        player: activePlayer,
      };
      return [...prevTurns, newTurn];
    });
    setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="PLAYER 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="PLAYER 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
