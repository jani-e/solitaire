import PropTypes from 'prop-types'

const GameBarButton = ({ handleClick, text, disabled=false }) => {
  const gameBarButtonStyle = {
    userSelect: 'none',
    padding: '3%',
    opacity: disabled ? '0.3' : 1
  }

  const handleClickAvailable = () => {
    if (!disabled) {
      return handleClick()
    }
  }

  return (
    <div style={gameBarButtonStyle} onClick={handleClickAvailable}>
      <svg viewBox='0 0 100 50'>
        <rect width='100%' height='100%' fill='white' stroke='black' strokeWidth='5%' />
        <text
          x='50%'
          y='50%'
          fill={'black'}
          fontSize='100%'
          fontWeight='bold'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {text}
        </text>
      </svg>
    </div>
  )
}

export default GameBarButton

GameBarButton.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool
}