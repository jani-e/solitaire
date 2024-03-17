import PropTypes from 'prop-types'
import CardFrame from './CardFrame'

const GameStack = ({ id, cards }) => {
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
      {<CardFrame origin={id} id={parent.id} value={parent.value} suit={parent.suit} revealedStatus={parent.revealed} cardSet={cards} />}
      {!!children.length && <div style={childrenStyle}>{<GameStack cards={children} />}</div>}
    </div>
  )
}

GameStack.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array
}

export default GameStack