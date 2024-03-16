import PropTypes from 'prop-types'
import CardCover from './CardCover'
import CardFrame from './CardFrame'

const SuitStack = ({ cards }) => {

  const emptySuitStackStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    marginLeft: '2px'
  }

  if (cards.length === 0) {
    return (
      <div style={emptySuitStackStyle}>
        <CardCover />
      </div>
    )
  }

  const [first] = cards
  const suit = first.suit
  const last = cards[cards.length - 1]

  return (
    <div id={suit}>
      <CardFrame id={parent.id} value={last.value} suit={last.suit} />
    </div>
  )
}

SuitStack.propTypes = {
  cards: PropTypes.array
}

export default SuitStack