import { useState } from 'react'
import GameStack from './components/GameStack'
import Deck from './components/Deck'
import Turned from './components/Turned'
import lodash from 'lodash'
import SuitStack from './components/SuitStack'
import createDeck from './utilities/createDeck'
import './App.css'
import { DndContext } from '@dnd-kit/core'
import validate from './utilities/validate'

const App = () => {
  const initialDeck = lodash.shuffle(createDeck())

  const [deckStack, setDeckStack] = useState(initialDeck.slice(28, initialDeck.length))
  const [turnedStack, setTurnedStack] = useState([])
  const [suitStacks, setSuitStacks] = useState({ A: [], B: [], C: [], D: [] })
  const [gameStacks, setGameStacks] = useState({
    0: initialDeck.slice(0, 1),
    1: initialDeck.slice(1, 3),
    2: initialDeck.slice(3, 6),
    3: initialDeck.slice(6, 10),
    4: initialDeck.slice(10, 15),
    5: initialDeck.slice(15, 21),
    6: initialDeck.slice(21, 28)
  })

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%',
    maxWidth: '800px'
  }

  const turnCard = () => {
    const [firstCardInDeck] = deckStack
    setDeckStack(deckStack.filter(card => card.id !== firstCardInDeck.id))
    setTurnedStack(turnedStack.concat(deckStack.find(card => card.id === firstCardInDeck.id)))
  }

  const removeTurnedCard = () => {
    const last = turnedStack[turnedStack.length - 1]
    setTurnedStack(turnedStack.filter(card => card.id !== last.id))
  }

  const resetDeck = () => {
    setDeckStack(turnedStack)
    setTurnedStack([])
  }

  const addToSuitStack = (suitStack, card) => {
    setSuitStacks({
      ...suitStacks,
      [suitStack]: suitStacks[suitStack].concat(card)
    })
  }

  const removeFromSuitStack = (suitStack, card) => {
    setSuitStacks(prevState => ({
      ...prevState,
      [suitStack]: suitStacks[suitStack].filter(item => item.id !== card.id)
    }))
  }

  const isValidMove = (toStackId, cards) => {
    const stackData = getStackData(toStackId)
    return validate(stackData, cards)
  }

  const getStackData = (stack) => {
    if (stack in suitStacks) {
      return ['suitStack', suitStacks[stack]]
    }
    if (stack in gameStacks) {
      return ['gameStack', gameStacks[stack]]
    }
    return null
  }

  const executeMove = (fromStackId, toStackId, cards) => {
    if (toStackId in suitStacks) {
      addToSuitStack(toStackId, cards[0])
    }
    if (fromStackId in suitStacks) {
      removeFromSuitStack(fromStackId, cards[0])
    }
    if (fromStackId === 'turnedStack') {
      removeTurnedCard()
    }
  }

  const handleDragEnd = (event) => {
    console.log(event)
    if (event.over) {
      const frame = event.active.id
      const fromStackId = event.active.data.current.from
      const toStackId = event.over.id
      const cards = event.active.data.current.cards
      console.log('frame', frame)
      console.log('from', fromStackId)
      console.log('to', toStackId)
      console.log('card(s):')
      cards.forEach(card => {
        console.log(card)
      });
      if (isValidMove(toStackId, cards)) {
        executeMove(fromStackId, toStackId, cards)
      }
    }
  }

  return (
    <main>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={layoutStyle}>
          <Deck turnCard={turnCard} resetDeck={resetDeck} cards={deckStack} />
          <Turned id='turnedStack' cards={turnedStack} />
          <div></div>
          {Object.keys(suitStacks).map((stack) => (
            <SuitStack key={stack} id={stack} cards={suitStacks[stack]} />
          ))}
        </div>
        <br></br>
        <div style={layoutStyle}>
          {Object.keys(gameStacks).map((stack) => (
            <GameStack key={stack} id={stack} cards={gameStacks[stack]} />
          ))}
        </div>
      </DndContext>
    </main>
  )
}

export default App