import { describe, expect, test } from 'vitest'
import createDeck from "./createDeck";

describe('testDeck', () => {
  const testDeck = createDeck()

  const testSuits = testDeck.reduce((accumulator, card) => {
    if (!accumulator[card.suit]) {
      accumulator[card.suit] = 1
    } else {
      accumulator[card.suit]++
    }
    return accumulator
  }, {})

  test('should have 52 cards in total', () => {
    expect(testDeck.length).toBe(52)
  })

  describe('should have 4 suits', () => {

    const testSuitExists = (suit) => {
      test(`and should have ${suit} suit`, () => {
        expect(testSuits).toHaveProperty(suit)
      })
    }

    test('has 4 properties', () => {
      expect(Object.keys(testSuits).length).toBe(4)
    })

    testSuitExists('hearts')
    testSuitExists('clubs')
    testSuitExists('diamonds')
    testSuitExists('spades')
  })

})