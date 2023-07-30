import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDrag } from 'react-dnd'

const ItemTypes = {
  CARD: 'CARD'
}

const Card = ({ value, suit, color, tempSuit }) => {
  const [revealed, setRevealed] = useState(true)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const cardStyle = {
    opacity: isDragging ? 0.5 : 1,
    width: 100,
    height: 150,
    margin: 5
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

  if (!revealed) {
    return (
      <div ref={drag} style={cardStyle} onClick={() => setRevealed(!revealed)}>
        <svg width={100} height={150} >
          <rect width='100%' height='150%' fill="lightgrey" />
        </svg>
      </div>
    )
  }

  return (
    <div ref={drag} style={cardStyle} onClick={() => setRevealed(!revealed)}>
      <svg width={100} height={150} >
        <rect width='100%' height='150%' fill="white" />
        <text x={80} y={20} fill={color}>{cardValue()}</text>
        <text x={5} y={140} fill={color}>{cardValue()}</text>
        <text x={5} y={20} fill={color}>{suit}</text>
        <text x={80} y={140} fill={color}>{suit}</text>
        <text x={12} y={105} fill={color} fontSize={77}>{tempSuit}</text>
      </svg>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.number,
  suit: PropTypes.string,
  color: PropTypes.string,
  tempSuit: PropTypes.string
}

export default Card