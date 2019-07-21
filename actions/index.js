export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function createDeck(id, deckTitle) {
  return {
    type: CREATE_DECK,
    id,
    deckTitle
  }
}

export function addCard(id, card) {
  return {
    type: ADD_CARD,
    id,
    card
  }
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  }
}