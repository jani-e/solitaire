import PropTypes from 'prop-types'

const VictoryModal = ({ isOpen, createNewGame, score, seconds, timer }) => {
  if (!isOpen) {
    return null
  }

  const victoryModalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '7',
    userSelect: 'none'
  }

  const victoryModalContentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    position: 'relative',
    maxWidth: '300px',
    width: '100%',
    textAlign: 'center'
  }

  const handleClick = () => {
    createNewGame()
  }

  return (
    <div style={victoryModalOverlayStyle}>
      <div style={victoryModalContentStyle}>
        <h2>You won!</h2>
        <h3>Score</h3>
        <p>{score}</p>
        <h3>Time</h3>
        <p>{timer}</p>
        <h3>Game Score</h3>
        <p>{Math.max(0, Math.floor((score-seconds/42)*77))}</p>
        <button onClick={() => handleClick()}>New game</button>
      </div>
    </div>
  )
}

export default VictoryModal

VictoryModal.propTypes = {
  isOpen: PropTypes.bool,
  createNewGame: PropTypes.func,
  score: PropTypes.number,
  seconds: PropTypes.number,
  timer: PropTypes.string
}