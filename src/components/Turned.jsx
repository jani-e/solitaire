import PropTypes from 'prop-types'
import CardFrame from './CardFrame'

const Turned = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div></div>
    )
  }
  const last = cards[cards.length - 1]
  return (
    <div id='turnedDeck'>
      <CardFrame id={last.id} value={last.value} suit={last.suit}></CardFrame>
    </div>
  )
}

Turned.propTypes = {
  cards: PropTypes.array
}

export default Turned