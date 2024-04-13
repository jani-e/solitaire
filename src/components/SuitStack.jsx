import PropTypes from 'prop-types'
import CardCover from './CardCover'
import CardFrame from './CardFrame'
import { useDroppable } from '@dnd-kit/core'

const SuitStack = ({ id, cards }) => {
  const { setNodeRef } = useDroppable({
    id: id
  })

  const emptySuitStackStyle = {
    marginLeft: '2px'
  }

  if (cards.length === 0) {
    return (
      <div ref={setNodeRef} style={emptySuitStackStyle}>
        <CardCover blank={true} />
      </div>
    )
  }

  const last = cards[cards.length - 1]

  return (
    <div id={id} ref={setNodeRef}>
      <CardFrame origin={id} id={last.id} value={last.value} suit={last.suit} />
    </div>
  )
}

SuitStack.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array
}

export default SuitStack