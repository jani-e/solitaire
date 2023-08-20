import PropTypes from 'prop-types'
import Card from "src/components/Card"

const Deck = ({ cards }) => {
  const [first] = cards
  return (
    <div>
      <Card value={first.value} suit={first.suit} ></Card>
    </div>
  )
}

Deck.propTypes = {
  cards: PropTypes.array
}

export default Deck