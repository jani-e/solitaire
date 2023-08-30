import PropTypes from 'prop-types'
import Card from 'src/components/Card'

const SuitStack = ({ cards }) => {
  const emptyStyle = {
    backgroundColor: 'lightgrey',
    margin: '5px 0px 5px 5px'
  }

  if (cards.length === 0) {
    return (
      <div style={emptyStyle}></div>
    )
  }
  const [first] = cards
  const last = cards[cards.length - 1]

  return (
    <div>
      <Card value={last.value} suit={last.suit} revealedStatus={last.revealed} />
    </div>
  )
}

SuitStack.propTypes = {
  cards: PropTypes.array
}

export default SuitStack