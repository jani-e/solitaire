import { useState } from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from 'src/components/Card'
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

  const initialDeck = {
    stack: playDeck.slice(28, playDeck.length),
    turned: [],
    suitStackOne: [],
    suitStackTwo: [],
    suitStackThree: [],
    suitStackFour: [],
    stackOne: playDeck.slice(0, 1),
    stackTwo: playDeck.slice(1, 3),
    stackThree: playDeck.slice(3, 6),
    stackFour: playDeck.slice(6, 10),
    stackFive: playDeck.slice(10, 15),
    stackSix: playDeck.slice(15, 21),
    stackSeven: playDeck.slice(21, 28)
  }

  const [deck, setDeck] = useState(initialDeck)
  const [id, setId] = useState('')
  const [destination, setDestination] = useState('suitStackOne')


  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '105px 105px 105px 105px 105px 105px 105px'
  }

  const moveCard = (id, destination) => {
    const destinationProp = destination
    if (!deck.stack.find(card => card.id === id)) {
      console.log('not found')
      return
    }
    setDeck({
      ...deck,
      [destinationProp]: deck[destinationProp].concat(deck.stack.find(card => card.id === id)),
      stack: deck.stack.filter(card => card.id !== id)
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
      <button onClick={() => (moveCard(id, destination), setId(''))}>move card id:</button>
      <input value={id} onChange={({ target: { value: id } }) => setId(Number(id))} />
      <select value={destination} onChange={({ target: { value: destination } }) => setDestination(destination)}>
        <option value='suitStackOne'>turned</option>
        <option value='stackOne'>stackOne</option>
        <option value='stackTwo'>stackTwo</option>
      </select>
      <DndProvider backend={HTML5Backend}>
        <div style={layoutStyle}>
          <Deck moveCard={moveCard} resetDeck={resetDeck} cards={deck.stack} />
          <Turned cards={deck.turned} />
          <div></div>
          <SuitStack cards={deck.suitStackOne} />
          <SuitStack cards={deck.suitStackTwo} />
          <SuitStack cards={deck.suitStackThree} />
          <SuitStack cards={deck.suitStackFour} />
          <Stack cards={deck.stackOne} />
          <Stack cards={deck.stackTwo} />
          <Stack cards={deck.stackThree} />
          <Stack cards={deck.stackFour} />
          <Stack cards={deck.stackFive} />
          <Stack cards={deck.stackSix} />
          <Stack cards={deck.stackSeven} />
        </div>
        {/* <div style={layoutStyle}>
          {deck.stack.map(card => <Card key={card.id} value={card.value} suit={card.suit} />)}
        </div> */}
      </DndProvider>
    </div>
  )
}

const Dropzone = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const dropzoneStyle = {
    backgroundColor: isOver ? 'red' : 'grey',
    width: '100px',
    height: '150px',
    margin: '5px'
  }

  return (
    <div ref={drop} role={'dropzone'} style={dropzoneStyle}>
      {canDrop ? 'Release' : 'Drag here'}
    </div>
  )
}

export default Solitaire