const createDeck = () => {
  const heartsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'hearts' }))
  const diamondsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'diamonds' }))
  const clubsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'clubs' }))
  const spadesDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'spades' }))

  const playDeck = heartsDeck
    .concat(diamondsDeck, clubsDeck, spadesDeck)
    .map((card, index) => ({ id: index + 1, ...card }))

  return playDeck
}

export default createDeck