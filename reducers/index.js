import {
  ADD_CARD,
  CREATE_DECK,
  RECEIVE_DECKS,
  REMOVE_DECK } from '../actions'

export default function deckOfCards(state={}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          deckTitle: action.deckTitle,
          questions: []
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat([action.card])
        }
      };
    case REMOVE_DECK:
      const deck = Object.assign({}, state)
      delete deck[action.id]
        return deck
    default:
      return state
  }
}