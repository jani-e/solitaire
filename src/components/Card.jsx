import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'

const ItemTypes = {
  CARD: 'card'
}

const Card = ({ value, suit, color, tempSuit }) => {
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

  return (
    <div ref={drag} style={cardStyle}>
      <svg width={100} height={150} >
        <rect width='100%' height='150%' fill="white" />
        <text x={80} y={20} fill={color}>{value}</text>
        <text x={5} y={140} fill={color}>{value}</text>
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