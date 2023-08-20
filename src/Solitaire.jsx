import { useState } from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from 'src/components/Card'
import Stack from 'src/components/Stack'
import Deck from 'src/components/Deck'
import Turned from 'src/components/Turned'

const Solitaire = () => {
  const heartsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'hearts' }))
  const diamondsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'diamonds' }))
  const clubsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'clubs' }))
  const spadesDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'spades' }))

  const playDeck = heartsDeck
    .concat(diamondsDeck, clubsDeck, spadesDeck)
    .map((card, index) => ({ id: index + 1, ...card }))

  const initialDeck = {
    stack: playDeck,
    turned: [],
    hearts: [],
    diamonds: [],
    clubs: [],
    spades: [],
    stackOne: [],
    stackTwo: [],
    stackThree: [],
    stackFour: [],
    stackFive: [],
    stackSix: [],
    stackSeven: []
  }

  const [deck, setDeck] = useState(initialDeck)
  const [id, setId] = useState('')
  const [destination, setDestination] = useState('turned')


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

  console.log(deck)

  return (
    <div>
      <button onClick={() => (moveCard(id, destination), setId(''))}>move card id:</button>
      <input value={id} onChange={({ target: { value: id } }) => setId(Number(id))} />
      <select value={destination} onChange={({ target: { value: destination } }) => setDestination(destination)}>
        <option value='turned'>turned</option>
        <option value='stackOne'>stackOne</option>
        <option value='stackTwo'>stackTwo</option>
      </select>
      <DndProvider backend={HTML5Backend}>
        <div style={layoutStyle}>
          <Deck cards={deck.stack} />
          <Turned cards={deck.turned} />
          <div></div>
          <Dropzone />
          <Dropzone />
          <Dropzone />
          <Dropzone />
          <Stack cards={deck.stackOne} />
          <Stack cards={deck.stackTwo} />
          <Stack cards={deck.stackThree} />
          <Stack cards={deck.stackFour} />
          <Stack cards={deck.stackFive} />
          <Stack cards={deck.stackSix} />
          <Stack cards={deck.stackSeven} />
        </div>
        <div style={layoutStyle}>
          {deck.stack.map(card => <Card key={card.id} value={card.value} suit={card.suit} />)}
        </div>
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