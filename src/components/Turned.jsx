import PropTypes from 'prop-types'
import Card from "src/components/Card"

const Turned = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div></div>
    )
  }
  const last = cards[cards.length - 1]
  return (
    <div>
      <Card value={last.value} suit={last.suit} revealedStatus={last.revealed} ></Card>
    </div>
  )
}

Turned.propTypes = {
  cards: PropTypes.array
}

export default Turned