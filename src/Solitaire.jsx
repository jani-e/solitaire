import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Stack from 'src/components/Stack'
import Deck from 'src/components/Deck'
import Turned from 'src/components/Turned'
import lodash from 'lodash'
import SuitStack from './components/SuitStack'

const Solitaire = () => {
  const heartsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'hearts' }))
  const diamondsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'diamonds' }))
  const clubsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'clubs' }))
  const spadesDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'spades' }))

  const playDeck = lodash.shuffle(
    heartsDeck
      .concat(diamondsDeck, clubsDeck, spadesDeck)
      .map((card, index) => ({ id: index + 1, ...card }))
  )

  const hideCards = (cards) => {
    const unRevealedCards = cards.map(card => ({ ...card, revealed: false }))
    const lastCard = unRevealedCards.pop()
    const lastCardRevealed = {
      ...lastCard,
      revealed: true
    }
    return unRevealedCards.concat(lastCardRevealed)
  }

  const initialDeck = {
    stack: playDeck.slice(28, playDeck.length),
    turned: [],
    suitStackOne: [],
    suitStackTwo: [],
    suitStackThree: [],
    suitStackFour: [],
    stackOne: playDeck.slice(0, 1),
    stackTwo: hideCards(playDeck.slice(1, 3)),
    stackThree: hideCards(playDeck.slice(3, 6)),
    stackFour: hideCards(playDeck.slice(6, 10)),
    stackFive: hideCards(playDeck.slice(10, 15)),
    stackSix: hideCards(playDeck.slice(15, 21)),
    stackSeven: hideCards(playDeck.slice(21, 28))
  }

  const [deck, setDeck] = useState(initialDeck)

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '105px 105px 105px 105px 105px 105px 105px'
  }

  const moveCard = (id, origin, destination) => {
    console.log(`moving card ${id} from ${origin} to ${destination}`)
    const originProp = origin
    const destinationProp = destination
    if (!deck[originProp].find(card => card.id === id)) {
      console.log('not found')
      return
    }
    setDeck({
      ...deck,
      [destinationProp]: deck[destinationProp].concat(deck[originProp].find(card => card.id === id)),
      [originProp]: deck[originProp].filter(card => card.id !== id)
    })
  }

  const resetDeck = () => {
    setDeck({
      ...deck,
      stack: deck.turned,
      turned: []
    })
  }

  console.log(deck)

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div style={layoutStyle}>
          <Deck moveCard={moveCard} resetDeck={resetDeck} cards={deck.stack} />
          <Turned moveCard={moveCard} cards={deck.turned} />
          <div></div>
          <SuitStack moveCard={moveCard} cards={deck.suitStackOne} origin='suitStackOne' />
          <SuitStack moveCard={moveCard} cards={deck.suitStackTwo} origin='suitStackTwo' />
          <SuitStack moveCard={moveCard} cards={deck.suitStackThree} origin='suitStackThree' />
          <SuitStack moveCard={moveCard} cards={deck.suitStackFour} origin='suitStackFour' />
          <Stack moveCard={moveCard} cards={deck.stackOne} origin='stackOne' />
          <Stack moveCard={moveCard} cards={deck.stackTwo} origin='stackTwo' />
          <Stack moveCard={moveCard} cards={deck.stackThree} origin='stackThree' />
          <Stack moveCard={moveCard} cards={deck.stackFour} origin='stackFour' />
          <Stack moveCard={moveCard} cards={deck.stackFive} origin='stackFive' />
          <Stack moveCard={moveCard} cards={deck.stackSix} origin='stackSix' />
          <Stack moveCard={moveCard} cards={deck.stackSeven} origin='stackSeven' />
        </div>
      </DndProvider>
    </div>
  )
}

export default Solitaire