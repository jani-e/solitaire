import PropTypes from 'prop-types'
import CardFrame from './CardFrame'

const GameStack = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div></div>
    )
  }

  const [parent, ...children] = cards

  const childrenStyle = {
    position: 'relative',
    marginTop: '-130px'
  }

  return (
    <div>
      {<CardFrame id={parent.id} value={parent.value} suit={parent.suit} revealedStatus={parent.revealed} />}
      {!!children.length && <div style={childrenStyle}>{<GameStack cards={children} />}</div>}
    </div>
  )
}

GameStack.propTypes = {
  cards: PropTypes.array
}

export default GameStack