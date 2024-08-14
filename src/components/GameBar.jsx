import PropTypes from 'prop-types'
import GameBarButton from './GameBarButton'
import GameBarInfo from './GameBarInfo'

const GameBar = ({ count, handleUndo, createNewGame, score, timer }) => {
  
  const gameBarStyle = {
    marginTop: '2%',
    position: 'relative',
    left: '-50%',
    display: 'grid',
    gridTemplateColumns: '14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%',
    placeContent: 'center'
  }
  
  const handleNewGame = () => {
    if (confirm('Create a new game?')) {
      createNewGame()
    }
  }

  return (
    <div style={gameBarStyle}>
      <GameBarButton handleClick={handleUndo} text={'Undo \u27F2'} disabled={!count > 0} />
      <div></div>
      <GameBarInfo text={'SCORE'} value={score} />
      <GameBarInfo text={'TIME'} value={timer} />
      <div></div>
      <GameBarButton handleClick={handleNewGame} text={'New game'} />
      <GameBarButton text={'Settings'} disabled={true} />
    </div>
  )
}

export default GameBar

GameBar.propTypes = {
  count: PropTypes.number,
  handleUndo: PropTypes.func,
  createNewGame: PropTypes.func,
  score: PropTypes.string,
  timer: PropTypes.string
}