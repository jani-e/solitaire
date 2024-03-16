import PropTypes from 'prop-types'
import CardFrame from './CardFrame'

const Deck = ({ cards, turnCard, resetDeck }) => {
  const refreshDeckStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    maxHeight: '154px',
    marginLeft: '2px',
    userSelect: 'none'
  }

  if (cards.length === 0) {
    return (
      <div onClick={() => resetDeck()} style={refreshDeckStyle}>
        <svg width='100%' height='100%'>
          <rect width='100%' height='100%' fill='#358a13' />
          <text x='50%' y='67.5%' textAnchor='middle' fontSize='500%'>{'\u21BB'}</text>
        </svg>
      </div>
    )
  }
  const [first] = cards
  return (
    <div id='deck' onClick={() => turnCard()}>
      <CardFrame id={first.id} value={first.value} suit={first.suit} revealed={false} ></CardFrame>
    </div>
  )
}

Deck.propTypes = {
  cards: PropTypes.array,
  turnCard: PropTypes.func,
  resetDeck: PropTypes.func
}

export default Deck