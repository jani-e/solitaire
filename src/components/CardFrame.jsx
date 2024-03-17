import PropTypes from 'prop-types'
import Card from './Card'
import CardCover from './CardCover'
import { useDraggable } from '@dnd-kit/core'

const CardFrame = ({ id, value, suit, revealed = true, origin = null, cardSet = [{ id, value, suit }] }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${id}_frame`,
    data: {
      from: origin,
      cards: cardSet
    }
  })

  const draggableStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  const cardFrameStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    marginLeft: '2px'
  }

  if (!revealed) {
    return (
      <div style={cardFrameStyle}>
        <CardCover />
      </div>
    )
  }

  return (
    <div id={id} ref={setNodeRef} style={{ ...cardFrameStyle, ...draggableStyle }} {...listeners} {...attributes}>
      <Card value={value} suit={suit} />
    </div>
  )
}

CardFrame.propTypes = {
  id: PropTypes.number,
  value: PropTypes.number,
  suit: PropTypes.string,
  revealed: PropTypes.bool,
  origin: PropTypes.string,
  cardSet: PropTypes.array
}

export default CardFrame