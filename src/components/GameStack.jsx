import PropTypes from 'prop-types'
import GameStackFrame from './GameStackFrame'
import { useDroppable } from '@dnd-kit/core'

const GameStack = ({ id, cards, hiddenCount, updateHiddenCount }) => {

  const handleHiddenCount = () => {
    updateHiddenCount(id)
  }

  const { setNodeRef } = useDroppable({
    id: id
  })

  const emptyStackStyle = {
    marginLeft: '2px'
  }

  if (cards.length === 0) {
    return (
      <div ref={setNodeRef} style={emptyStackStyle}>
        <div id={id}></div>
      </div>
    )
  }
  return (
    <div id={id} ref={setNodeRef}>
      <GameStackFrame origin={id} id={id} cards={cards} hiddenCount={hiddenCount} handleHiddenCount={handleHiddenCount} />
    </div>
  )
}

GameStack.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array,
  hiddenCount: PropTypes.number,
  updateHiddenCount: PropTypes.func
}

export default GameStack