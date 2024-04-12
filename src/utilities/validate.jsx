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
  const suitValues = {
    'hearts': 0,
    'diamonds': 0,
    'clubs': 1,
    'spades': 1
  }
  const lastCard = stackData[1][stackData[1].length - 1]
  const firstCard = cards[0]
  
  if (stackData[1].length === 0 && firstCard.value === 13) {
    return true
  }
  if (stackData[1].length === 0 && firstCard.value !== 13) {
    return false
  }
  if (suitValues[lastCard.suit] + suitValues[firstCard.suit] !== 1) {
    return false
  }
  if (lastCard.value - firstCard.value !== 1) {
    return false
  }
  return true
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