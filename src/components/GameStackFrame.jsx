import PropTypes from 'prop-types'
import Card from './Card'
import CardCover from './CardCover'
import { useDraggable } from '@dnd-kit/core'

const GameStackFrame = ({ id, hiddenCount, updateHiddenCount, origin = null, cards }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${id}_frame`,
    data: {
      from: origin,
      cards: cards
    }
  })

  const draggableStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  const cardFrameStyle = {
    marginLeft: '2px'
  }

  const childrenStyle = {
    marginTop: '-120%'
  }

  const [parent, ...children] = cards
  const childrenFrameId = `${id}_${parent.id}`
  const newHiddenCount = hiddenCount - 1

  const handleRevealClick = () => {
    if (newHiddenCount === 0 && children.length === 0) {
      updateHiddenCount()
    }
  }

  if (newHiddenCount >= 0) {
    return (
      <div>
        <div style={cardFrameStyle} onClick={() => handleRevealClick()}>
          <CardCover /></div>
        {!!children.length && <div style={childrenStyle}>{<GameStackFrame id={childrenFrameId} origin={id} cards={children} hiddenCount={newHiddenCount} updateHiddenCount={updateHiddenCount} />}</div>}
      </div>
    )
  }

  return (
    <div id={id} ref={setNodeRef} style={draggableStyle} {...listeners} {...attributes}>
      <div style={cardFrameStyle}>
        <Card value={parent.value} suit={parent.suit} />
      </div>
      {!!children.length && <div style={childrenStyle}>{<GameStackFrame id={childrenFrameId} origin={id} cards={children} hiddenCount={newHiddenCount} updateHiddenCount={updateHiddenCount} />}</div>}
    </div>
  )
}

GameStackFrame.propTypes = {
  id: PropTypes.string,
  hiddenCount: PropTypes.number,
  updateHiddenCount: PropTypes.func,
  origin: PropTypes.string,
  cards: PropTypes.array
}

export default GameStackFrame