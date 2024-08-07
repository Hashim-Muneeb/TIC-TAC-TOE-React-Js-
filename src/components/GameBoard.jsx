import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onSelectSquare, turns = [] }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // Update game board based on turns prop
  useEffect(() => {
    const newGameBoard = initialGameBoard.map(row => row.slice());
    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      newGameBoard[row][col] = player;
    }
    setGameBoard(newGameBoard);
  }, [turns]);

  function handleSelectedSquare(rowIndex, colIndex) {
    if (!gameBoard[rowIndex][colIndex]) {
      onSelectSquare(rowIndex, colIndex);
    }
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleSelectedSquare(rowIndex, colIndex)}
                  disabled={!!playerSymbol}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

GameBoard.propTypes = {
  onSelectSquare: PropTypes.func.isRequired,
  turns: PropTypes.arrayOf(
    PropTypes.shape({
      square: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
      }).isRequired,
      player: PropTypes.string.isRequired,
    })
  ),
};

export default GameBoard;
