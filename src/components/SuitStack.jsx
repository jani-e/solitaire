import PropTypes from 'prop-types'
import CardCover from './CardCover'
import CardFrame from './CardFrame'
import { useDroppable } from '@dnd-kit/core'

const SuitStack = ({ id, cards }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id
  })

  const droppableStyle = {
    borderColor: isOver ? 'red' : 'black'
  }

  const emptySuitStackStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    marginLeft: '2px'
  }

  if (cards.length === 0) {
    return (
      <div ref={setNodeRef} style={{ ...emptySuitStackStyle, ...droppableStyle }}>
        <CardCover />
      </div>
    )
  }

  const [first] = cards
  const suit = first.suit
  const last = cards[cards.length - 1]

  return (
    <div id={suit} ref={setNodeRef} style={droppableStyle}>
      <CardFrame id={parent.id} value={last.value} suit={last.suit} />
    </div>
  )
}

SuitStack.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array
}

export default SuitStack