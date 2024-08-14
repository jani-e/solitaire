import PropTypes from 'prop-types'

const CardCover = ({ blank = false }) => {

  const cardCoverStyle = {
    userSelect: 'none'
  }

  if (blank) {
    return (
      <div style={cardCoverStyle}>
        <svg viewBox='0 0 100 150'>
          <rect width='100%' height='100%' fillOpacity='0.2' display='block' stroke='black' strokeWidth='5%' />
        </svg>
      </div >
    )
  }

  return (
    <div style={cardCoverStyle}>
      <svg viewBox='0 0 100 150'>
        <defs>
          <radialGradient
            id="grad"
            cx="1"
            cy="0"
            r="0.8"
            fx="0.7"
            fy="0.45"
            spreadMethod="reflect">
            <stop offset="0%" stopColor='rgb(249,159,45)' stopOpacity={1} />
            <stop offset="100%" stopColor='rgb(37,111,159)' stopOpacity={1} />
          </radialGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#grad)' display='block' stroke='black' strokeWidth='5%' />
      </svg>
    </div>
  )
}

CardCover.propTypes = {
  blank: PropTypes.bool
}

export default CardCover