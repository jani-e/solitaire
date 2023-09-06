import PropTypes from 'prop-types'
import Card from 'src/components/Card'
import Dropzone from 'src/components/Dropzone'

const SuitStack = ({ cards, origin, moveCard }) => {
  const emptyStyle = {
    backgroundColor: 'lightgrey',
    margin: '5px 0px 5px 5px'
  }

  if (cards.length === 0) {
    return (
      <Dropzone origin={origin}>
        <div style={emptyStyle}></div>
      </Dropzone>
    )
  }
  const [first] = cards
  const last = cards[cards.length - 1]

  return (
    <Dropzone origin={origin}>
        <Card origin={origin} moveCard={moveCard} id={parent.id} value={last.value} suit={last.suit} revealedStatus={last.revealed} />
    </Dropzone>
  )
}

SuitStack.propTypes = {
  cards: PropTypes.array
}

export default SuitStack