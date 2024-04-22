import PropTypes from 'prop-types'

const GameBar = ({count, handleUndo}) => {

  const gameBarStyle = {
    paddingTop: '20px',
    position: 'relative',
    left: '-50%',
  }

  const buttonStyle = {
    width: '14.2%',
    padding: '7px 0',
  }

  return (
    <div style={gameBarStyle}>
      {count > 0 ? <button style={buttonStyle} onClick={() => handleUndo()}>Undo</button> : <button style={buttonStyle} disabled>Undo</button>}
      {/* <span>Score: 0</span>
      <span>Time: 0:00</span>
      <button style={buttonStyle} disabled>New game</button>
      <button style={buttonStyle} disabled>Settings</button> */}
    </div>
  )
}

export default GameBar

GameBar.propTypes = {
  count: PropTypes.number,
  handleUndo: PropTypes.func
}