import PropTypes from 'prop-types'
import Card from './Card'
import CardCover from './CardCover'

const CardFrame = ({ id, value, suit, revealed = true }) => {

  const cardFrameStyle = {
    boxSizing: 'border-box',
    border: '2px solid black',
    marginLeft: '2px'
  }

  if (!revealed) {
    return (
      <div style={cardFrameStyle}>
        <CardCover />
      </div>
    )
  }

  return (
    <div style={cardFrameStyle} id={id}>
      <Card value={value} suit={suit} />
    </div>
  )
}

CardFrame.propTypes = {
  id: PropTypes.number,
  value: PropTypes.number,
  suit: PropTypes.string,
  revealed: PropTypes.bool
}

export default CardFrame