import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from 'src/components/Card'

const Solitaire = () => {

  const layoutStyle = {
    display: 'grid',
    gridTemplateColumns: '105px 105px 105px 105px 105px 105px 105px 105px'
  }

  const partialDeck = [...Array(13).keys()].map(i => i + 1)

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
      <div style={layoutStyle}>
        {partialDeck.map(card => <Card key={card} value={card} suit='hearts' />)}
        <Card value={12} suit='clubs' />
        <Card value={12} suit='clubs' />
        <Card value={12} suit='clubs' />
        <Card value={5} suit='hearts' />
        <Card value={5} suit='diamonds' />
        <Card value={12} suit='clubs' />
        <Card value={13} suit='spades' />
        <Card value={2} suit='spades' />
        <Dropzone />
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