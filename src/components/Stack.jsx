import PropTypes from 'prop-types'
import Card from "src/components/Card"
import Dropzone from 'src/components/Dropzone'

const Stack = ({ cards, moveCard, origin }) => {
  if (cards.length === 0) {
    return (
      <Dropzone origin={origin}>
        <div></div>
      </Dropzone>
    )
  }

  const [parent, ...children] = cards

  const childrenStyle = {
    position: 'relative',
    marginTop: '-130px'
  }

  return (
    <Dropzone origin={origin}>
        {<Card origin={origin} moveCard={moveCard} id={parent.id} value={parent.value} suit={parent.suit} revealedStatus={parent.revealed} />}
        {!!children.length && <div style={childrenStyle}>{<Stack cards={children} origin={origin} moveCard={moveCard} />}</div>}
    </Dropzone>
  )
}

Stack.propTypes = {
  cards: PropTypes.array
}

export default Stack