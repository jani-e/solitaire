import { useState } from 'react'
import GameStack from './components/GameStack'
import Deck from './components/Deck'
import Turned from './components/Turned'
import lodash from 'lodash'
import SuitStack from './components/SuitStack'
import createDeck from './utilities/createDeck'
import './App.css'

const App = () => {

  const initialDeck = lodash.shuffle(createDeck())

  const [deckStack, setDeckStack] = useState(initialDeck.slice(28, initialDeck.length))
  const [turnedStack, setTurnedStack] = useState([])
  const [suitStacks, setSuitStacks] = useState({ A: initialDeck.slice(1, 3), B: [], C: [], D: [] })
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

  const resetDeck = () => {
    setDeckStack(turnedStack)
    setTurnedStack([])
  }

  return (
    <main>
      <div style={layoutStyle}>
        <Deck turnCard={turnCard} resetDeck={resetDeck} cards={deckStack} />
        <Turned cards={turnedStack} />
        <div></div>
        {Object.keys(suitStacks).map((stack) => (
          <SuitStack key={stack} cards={suitStacks[stack]} />
        ))}
      </div>
      <br></br>
      <div style={layoutStyle}>
        {Object.keys(gameStacks).map((stack) => (
          <GameStack key={stack} cards={gameStacks[stack]} />
        ))}
      </div>
    </main>
  )
}

export default App