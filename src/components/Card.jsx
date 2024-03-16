import PropTypes from 'prop-types'

const Card = ({ value, suit }) => {

  const cardStyle = {
    userSelect: 'none',
    maxHeight: '150px'
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

  return (
    <div style={cardStyle}>
      <svg width='100%' height='100%'>
        <rect width='100%' height='100%' fill="white" />
        <text x='7%' y='17%' fill={cardSuit().color} fontSize='150%'>{cardSuit().small}</text>
        <text x='93%' y='17%' textAnchor='end' fill={cardSuit().color} fontSize='150%'>{cardValue()}</text>
        <text x='7%' y='93%' fill={cardSuit().color} fontSize='150%'>{cardValue()}</text>
        <text x='93%' y='93%' textAnchor='end' fill={cardSuit().color} fontSize='150%'>{cardSuit().small}</text>
        <text x='50%' y='67.5%' textAnchor='middle' fill={cardSuit().color} fontSize='500%'>{cardSuit().large}</text>
      </svg>
    </div>
  )
}

Card.propTypes = {
  value: PropTypes.number,
  suit: PropTypes.string
}

export default Card