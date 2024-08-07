import { useState } from "react";


import Player from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(){
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

  }



  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName=" PLAYER 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName=" PLAYER 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} acttivePlayerSymbol={activePlayer}/>
      </div>
      LOG
    </main>
  );
}

export default App;
