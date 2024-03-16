const CardCover = () => {

  const cardCoverStyle = {
    userSelect: 'none',
    maxHeight: '150px'
  }
  return (
    <div style={cardCoverStyle}>
      <svg width='100%' height='100%'>
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
        <rect width='100%' height='100%' fill='url(#grad)' display='block' />
      </svg>
    </div>
  )
}

export default CardCover