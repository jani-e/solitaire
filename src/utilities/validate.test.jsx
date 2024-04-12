import { describe, expect, test } from "vitest";
import validate from "./validate";

describe('Solitare Suit stack validation', () => {
  const heartsSuit = ['suitStack', [
    { id: 1, value: 1, suit: 'hearts' },
    { id: 2, value: 2, suit: 'hearts' },
    { id: 3, value: 3, suit: 'hearts' }
  ]]

  test('allows next card with correct suit and value', () => {
    const nextCard = [
      { id: 4, value: 4, suit: 'hearts' }
    ]
    const validationResult = validate(heartsSuit, nextCard)
    expect(validationResult).toBe(true)
  })

  test('allows card with first value regardless suit', () => {
    const emptySuit = ['suitStack', []]
    const nextCard = [{ id: 1, value: 1, suit: 'diamonds' }]
    const validationResult = validate(emptySuit, nextCard)
    expect(validationResult).toBe(true)
  })

  test(`doesn't allow card with incorrect value to an empty suit stack`, () => {
    const emptySuit = ['suitStack', []]
    const nextCard = [{ id: 7, value: 7, suit: 'hearts' }]
    const validationResult = validate(emptySuit, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow card with correct suit and incorrect value`, () => {
    const nextCard = [
      { id: 9, value: 9, suit: 'hearts' }
    ]
    const validationResult = validate(heartsSuit, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow card with correct value and incorrect suit`, () => {
    const nextCard = [
      { id: 4, value: 4, suit: 'clubs' }
    ]
    const validationResult = validate(heartsSuit, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow multiple cards`, () => {
    const threeCards = [
      { id: 4, value: 4, suit: 'hearts' },
      { id: 5, value: 5, suit: 'hearts' },
      { id: 6, value: 6, suit: 'hearts' },
    ]
    const validationResult = validate(heartsSuit, threeCards)
    expect(validationResult).toBe(false)
  })
})

describe('Solitaire Game stack validation', () => {
  const gameStack = ['gameStack', [
    { id: 16, value: 3, suit: 'diamonds' },
    { id: 35, value: 9, suit: 'clubs' }
  ]]

  const emptyGameStack = ['gameStack', []]

  test('allows next card with correct suit and value', () => {
    const nextCard = [{ id: 8, value: 8, suit: 'hearts' }]
    const validationResult = validate(gameStack, nextCard)
    expect(validationResult).toBe(true)
  })

  test('allows card with king to an empty game stack', () => {
    const nextCard = [{ id: 13, value: 13, suit: 'hearts' }]
    const validationResult = validate(emptyGameStack, nextCard)
    expect(validationResult).toBe(true)
  })

  test('allows a set of correct cards', () => {
    const correctCards = [
      { id: 8, value: 8, suit: 'hearts' },
      { id: 46, value: 7, suit: 'spades' },
      { id: 19, value: 6, suit: 'diamonds' }
    ]
    const validationResult = validate(gameStack, correctCards)
    expect(validationResult).toBe(true)
  })

  test(`doesn't allow next card with correct value and incorrect suit`, () => {
    const nextCard = [{ id: 34, value: 8, suit: 'clubs' }]
    const validationResult = validate(gameStack, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow next card with correct suit and incorrect value`, () => {
    const nextCard = [{ id: 8, value: 11, suit: 'hearts' }]
    const validationResult = validate(gameStack, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow incorrect non-king card to an empty game stack`, () => {
    const nextCard = [{ id: 1, value: 1, suit: 'hearts' }]
    const validationResult = validate(emptyGameStack, nextCard)
    expect(validationResult).toBe(false)
  })

  test(`doesn't allow a set of incorrect cards`, () => {
    const incorrectCards = [
      { id: 8, value: 8, suit: 'clubs' },
      { id: 20, value: 7, suit: 'diamonds' },
      { id: 46, value: 7, suit: 'spades'}
    ]
    const validationResult = validate(gameStack, incorrectCards)
    expect(validationResult).toBe(false)
  })
})