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
import GameBar from './components/GameBar'

const App = () => {
  const initialDeck = lodash.shuffle(createDeck())

  const [deckStack, setDeckStack] = useState(initialDeck.slice(28, initialDeck.length))
  const [turnedStack, setTurnedStack] = useState([])
  const [suitStacks, setSuitStacks] = useState({ A: [], B: [], C: [], D: [] })
  const [gameStacks, setGameStacks] = useState({
    G0: { cards: initialDeck.slice(0, 1), hiddenCount: 0 },
    G1: { cards: initialDeck.slice(1, 3), hiddenCount: 1 },
    G2: { cards: initialDeck.slice(3, 6), hiddenCount: 2 },
    G3: { cards: initialDeck.slice(6, 10), hiddenCount: 3 },
    G4: { cards: initialDeck.slice(10, 15), hiddenCount: 4 },
    G5: { cards: initialDeck.slice(15, 21), hiddenCount: 5 },
    G6: { cards: initialDeck.slice(21, 28), hiddenCount: 6 }
  })

  const [history, setHistory] = useState({
    count: 0,
    cardsState: []
  })

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%'
  }

  const saveHistoryState = () => {
    setHistory({
      ...history, count: history.count + 1,
      cardsState: history.cardsState.concat({
        deck: deckStack,
        turned: turnedStack,
        suit: suitStacks,
        game: gameStacks
      })
    })
  }

  const turnCard = () => {
    const [firstCardInDeck] = deckStack
    setDeckStack(deckStack.filter(card => card.id !== firstCardInDeck.id))
    setTurnedStack(turnedStack.concat(deckStack.find(card => card.id === firstCardInDeck.id)))
    saveHistoryState()
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

  const addToGameStack = (gameStack, cards) => {
    console.log(gameStack, cards)
    setGameStacks(prevState => ({
      ...prevState,
      [gameStack]: {
        ...prevState[gameStack],
        cards: prevState[gameStack].cards.concat(cards)
      }
    }))
  }

  const removeFromGameStack = (gameStack, cards) => {
    const cardIds = cards.map(card => card.id)
    setGameStacks(prevState => ({
      ...prevState,
      [gameStack]: {
        ...prevState[gameStack],
        cards: prevState[gameStack].cards.filter(item => !cardIds.includes(item.id))
      }
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
      return ['gameStack', gameStacks[stack].cards]
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
    if (toStackId in gameStacks) {
      addToGameStack(toStackId, cards)
    }
    if (fromStackId in gameStacks) {
      removeFromGameStack(fromStackId, cards)
    }
    if (fromStackId === 'turnedStack') {
      removeTurnedCard()
    }
  }

  const handleDragEnd = (event) => {
    if (event.over) {
      let fromStackId = event.active.data.current.from
      const toStackId = event.over.id
      const cards = event.active.data.current.cards
      if (fromStackId.includes('_')) {
        fromStackId = fromStackId.slice(0, 2)
      }
      if (isValidMove(toStackId, cards)) {
        executeMove(fromStackId, toStackId, cards)
        saveHistoryState()
      }
    }
  }

  const handleUndo = () => {
    const copyCardsStateHistory = [...history.cardsState]
    const applyHistory = copyCardsStateHistory.pop()
    setDeckStack(applyHistory.deck)
    setTurnedStack(applyHistory.turned)
    setSuitStacks(applyHistory.suit)
    setGameStacks(applyHistory.game)
    setHistory({ count: history.count - 1, cardsState: copyCardsStateHistory })
  }

  const updateHiddenCount = (gameStack) => {
    const newCount = gameStacks[gameStack].hiddenCount - 1
    setGameStacks(prevState => ({
      ...prevState,
      [gameStack]: {
        ...prevState[gameStack],
        hiddenCount: prevState[gameStack].hiddenCount = newCount
      }
    }))
  }

  return (
    <div id='game'>
      <GameBar count={history.count} handleUndo={handleUndo} />
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
              <GameStack key={stack} id={stack} cards={gameStacks[stack].cards} hiddenCount={gameStacks[stack].hiddenCount} updateHiddenCount={updateHiddenCount} />
            ))}
          </div>
        </DndContext>
      </main>
    </div>
  )
}

export default App