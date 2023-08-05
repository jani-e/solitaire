import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from 'src/components/Card'
import Stack from 'src/components/Stack'

const Solitaire = () => {

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '105px 105px 105px 105px 105px 105px 105px 105px'
  }

  const heartsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'hearts' }))
  const diamondsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'diamonds' }))
  const clubsDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'clubs' }))
  const spadesDeck = [...Array(13).keys()].map(i => ({ value: i + 1, suit: 'spades' }))

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <div style={layoutStyle}>
        {heartsDeck.map(card => <Card key={card.value} value={card.value} suit={card.suit} />)}
        <div></div>
        {diamondsDeck.map(card => <Card key={card.value} value={card.value} suit={card.suit} />)}
        {clubsDeck.map(card => <Card key={card.value} value={card.value} suit={card.suit} />)}
        {spadesDeck.map(card => <Card key={card.value} value={card.value} suit={card.suit} />)}
        <Dropzone />
        <Stack cards={heartsDeck} />
        <Stack cards={diamondsDeck} />
        <Stack cards={clubsDeck} />
        <Stack cards={spadesDeck} />
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

/*
todo / things to consider
- can svg be dragged and moved like in solitaire game?
  - Card that is a div and contains svg can be dragged --> react DnD
  - cards should have fixed places
- card styling
  - hidden card / reveal card -> useState?
  - card colors and 'tempSuit' added in suits
  - value display logic for 1 ace, 11 jack, 12 queen, 13 king
- game code logic
  - tracking where cards are
  - double click card logic
  - deck
- move card svg/image to assets or components? --> moved to components 
- moved game to its own repository
*/

export default Solitaire