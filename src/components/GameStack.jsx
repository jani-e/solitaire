import PropTypes from 'prop-types'
import GameStackFrame from './GameStackFrame'
import { useDroppable } from '@dnd-kit/core'
import { useState } from 'react'

const GameStack = ({ id, cards }) => {
  const [hiddenCount, setHiddenCount] = useState(Number(id.slice(1)))

  const updateHiddenCount = () => {
    setHiddenCount(hiddenCount - 1)
  }

  const { isOver, setNodeRef } = useDroppable({
    id: id
  })

  const emptyStackStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    marginLeft: '2px'
  }

  const droppableStyle = {
    // borderColor: isOver ? 'red' : 'black' //conflict during rerender
  }
  if (cards.length === 0) {
    return (
      <div ref={setNodeRef} style={{ ...emptyStackStyle, ...droppableStyle }}>
        <div id={id}></div>
      </div>
    )
  }
  return (
    <div id={id} ref={setNodeRef} style={droppableStyle}>
      <GameStackFrame origin={id} id={id} cards={cards} hiddenCount={hiddenCount} updateHiddenCount={updateHiddenCount} />
    </div>
  )
}

GameStack.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array
}

export default GameStack