import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Card from 'src/components/Card'

const Solitaire = () => {
  const suits = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  }

  const tempSuits = {
    hearts: '♡',
    diamonds: '♢',
    clubs: '♧',
    spades: '♤'
  }

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Card value={2} suit={suits.hearts} color='red' tempSuit={tempSuits.hearts} />
        <Card value={3} suit={suits.diamonds} color='red' tempSuit={tempSuits.diamonds} />
        <Card value={4} suit={suits.clubs} color='black' tempSuit={tempSuits.clubs} />
        <Card value={5} suit={suits.spades} color='black' tempSuit={tempSuits.spades} />
      </DndProvider>
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