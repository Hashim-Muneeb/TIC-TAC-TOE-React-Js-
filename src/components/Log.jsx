import PropTypes from "prop-types";

function Log({ turns = [] }) {
  return (
    <div id="log">
      <h2>Game Log</h2>
      <ul>
        {turns.map((turn, index) => (
          <li key={index}>
            Player {turn.player} moved to ({turn.square.row}, {turn.square.col})
          </li>
        ))}
      </ul>
    </div>
  );
}

Log.propTypes = {
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

export default Log;
