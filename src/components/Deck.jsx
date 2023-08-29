import PropTypes from 'prop-types'
import Card from "src/components/Card"

const Deck = ({ cards, moveCard, resetDeck}) => {
  if (cards.length === 0) {
    return (
      <div onClick={() => resetDeck()}>reset</div>
    )
  }
  const [first] = cards
  return (
    <div onClick={() => moveCard(first.id, 'turned')}>
      <Card value={first.value} suit={first.suit} ></Card>
    </div>
  )
}

Deck.propTypes = {
  cards: PropTypes.array,
  moveCard: PropTypes.func,
  resetDeck: PropTypes.func
}

export default Deck