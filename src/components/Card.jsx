import PropTypes from 'prop-types'
import { ItemTypes } from 'src/ItemTypes'
import { useState } from 'react'
import { useDrag } from 'react-dnd'

const Card = ({ id, value, suit, revealedStatus = true, moveCard, origin }) => {
  const [revealed, setRevealed] = useState(revealedStatus)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: id, origin: origin },
    end: (item, monitor) => {
      if (monitor.getDropResult() === null) {
        return null
      }
      const destination = monitor.getDropResult().destination
      console.log(`item: ${item.id}, origin: ${item.origin}, destination: ${destination}`)
      if (item && destination) {
        moveCard(item.id, item.origin, destination)
      }
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const cardStyle = {
    opacity: isDragging ? 0.5 : 1,
    width: 100,
    height: 150,
    border: '1px black solid'
  }

  const cardValue = () => {
    switch (value) {
      case 1: return 'A'
      case 11: return 'J'
      case 12: return 'Q'
      case 13: return 'K'
      default: return value
    }
  }

  const cardSuit = () => {
    switch (suit) {
      case 'hearts': return { small: '\u2665', large: '\u2661', color: 'red' }
      case 'diamonds': return { small: '\u2666', large: '\u2662', color: 'red' }
      case 'clubs': return { small: '\u2663', large: '\u2667', color: 'black' }
      case 'spades': return { small: '\u2660', large: '\u2664', color: 'black' }
    }
  }

  if (!revealed) {
    return (
      <div
      // onClick={() => setRevealed(!revealed)}
      >
        <svg width={100} height={150} >
          <rect width='100%' height='150%' fill="lightgrey" />
        </svg>
      </div>
    )
  }

  return (
    <div ref={drag} style={cardStyle}
    // onClick={() => setRevealed(!revealed)}
    >
      <svg width={100} height={150} >
        <rect width='100%' height='150%' fill="white" />
        <text x={80} y={20} fill={cardSuit().color}>{cardValue()}</text>
        <text x={5} y={140} fill={cardSuit().color}>{cardValue()}</text>
        <text x={5} y={20} fill={cardSuit().color}>{cardSuit().small}</text>
        <text x={80} y={140} fill={cardSuit().color}>{cardSuit().small}</text>
        <text x={12} y={105} fill={cardSuit().color} fontSize={77}>{cardSuit().large}</text>
      </svg>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.number,
  suit: PropTypes.string
}

export default Card