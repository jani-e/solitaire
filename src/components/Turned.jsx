import PropTypes from 'prop-types'
import CardFrame from './CardFrame'

const Turned = ({ id, cards }) => {
  if (cards.length === 0) {
    return (
      <div></div>
    )
  }
  const last = cards[cards.length - 1]
  return (
    <div id={id}>
      <CardFrame origin={id} id={last.id} value={last.value} suit={last.suit}></CardFrame>
    </div>
  )
}

Turned.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array
}

export default Turned