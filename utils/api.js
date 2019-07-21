import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'flashcards:decks'

const data = {}

// get decks
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => {
      if (results !== null) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
      } else {
        return JSON.parse(results);
      }
    }).catch(err => {
      console.log(err);
  });
}

// save deck
export function saveDeck(id, deckTitle) {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [id]: {
        id,
        deckTitle,
        questions: []
      }
    }));
}

// save card, adds a newly created card
export function saveCard(cardID, cardDeckTitle, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[cardID] = {
        [cardDeckTitle]: {
          ...results[cardDeckTitle],
          questions: {
            question: card.question,
            answer: card.answer
          }
        }
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results));
      return results;
    }).catch(err => {
      console.log(err);
    });
}

// remove deck
export function removeCardDeck(deck) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(results => {
      const data = JSON.parse(results);
      data[deck] = undefined
      delete data[deck]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }).catch(err => {
      console.log(err);
    });
}