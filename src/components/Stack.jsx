import PropTypes from 'prop-types'
import Card from "src/components/Card"

const Stack = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <div></div>
    )
  }

  const [parent, ...children] = cards

  const childrenStyle = {
    position: 'absolute',
    marginTop: '-130px'
  }

  return (
    <div>
      {<Card value={parent.value} suit={parent.suit} />}
      {!!children.length && <div style={childrenStyle}>{<Stack cards={children} />}</div>}
    </div>
  )
}

Stack.propTypes = {
  cards: PropTypes.array
}

export default Stack