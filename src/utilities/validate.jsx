const suitStackValidation = (stackData, cards) => {
  if (cards.length > 1) {
    return false
  }
  const cardSuit = cards[0].suit
  const cardValue = cards[0].value
  const stack = stackData[1]
  if (stack.length === 0 && cardValue !== 1) {
    return false
  }
  if (stack.length > 0) {
    const stackSuit = stack[0].suit
    const stackHighestValue = stack.slice(-1)[0].value
    if (stackSuit !== cardSuit) {
      return false
    }
    if (cardValue - stackHighestValue !== 1) {
      return false
    }
  }
  return true
}

const gameStackValidation = (stackData, cards) => {
  console.log('gameStack validation not implemented yet')
  return false
}

const validate = (stackData, cards) => {
  if (stackData[0] === 'suitStack') {
    return suitStackValidation(stackData, cards)
  }
  if (stackData[0] === 'gameStack') {
    return gameStackValidation(stackData, cards)
  }
  return false
}

export default validate