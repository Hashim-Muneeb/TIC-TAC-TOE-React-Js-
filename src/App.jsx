import { useState } from "react";
import Log from "./components/Log";
import Player from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner, setWinner] = useState(null);

  function handleSelectSquare(rowIndex, colIndex) {
    if (winner || gameBoard[rowIndex][colIndex]) return;

    const newTurn = {
      square: { row: rowIndex, col: colIndex },
      player: activePlayer,
    };

    const updatedBoard = gameBoard.map((row, rIdx) =>
      row.map((col, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? activePlayer : col
      )
    );

    setGameTurns((prevTurns) => [...prevTurns, newTurn]);
    setGameBoard(updatedBoard);
    setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));

    const gameWinner = checkWinner(updatedBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }

  function checkWinner(board) {
    const winningCombinations = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return board[a[0]][a[1]];
      }
    }
    return null;
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="PLAYER 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="PLAYER 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        {winner && <p>{winner} has won the game!</p>}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
