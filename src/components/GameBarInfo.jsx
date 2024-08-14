import PropTypes from 'prop-types'

const GameBarInfo = ({ text, value }) => {
  const gameBarInfoStyle = {
    userSelect: 'none',
    padding: '3%'
  }

  return (
    <div style={gameBarInfoStyle}>
      <svg viewBox='0 0 100 50'>
        <rect width='100%' height='100%' fill='white' stroke='black' strokeWidth='5%' />
        <text
          x='50%'
          y='30%'
          fill={'black'}
          fontSize='100%'
          fontWeight='bold'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {text}
        </text>
        <text
          x='50%'
          y='70%'
          fill={'black'}
          fontSize='100%'
          fontWeight='bold'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {value}
        </text>
      </svg>
    </div>
  )
}

export default GameBarInfo

GameBarInfo.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string
}