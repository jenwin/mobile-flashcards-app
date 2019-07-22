import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'flashcards:decks'

const data = {}

// get decks
export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    if (results !== null) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
    else {
      return JSON.parse(results);
    }
  }
  catch (err) {
    console.log(err);
  }
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
export async function saveCard(cardID, cardDeckTitle, card) {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[cardID] = {
      [cardDeckTitle]: {
        ...data[cardDeckTitle],
        questions: {
          question: card.question,
          answer: card.answer
        }
      }
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  catch (err) {
    console.log(err);
  }
}

// remove deck
export async function removeCardDeck(deck) {
  try {
    const results = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(results);
    data[deck] = undefined;
    delete data[deck];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }
  catch (err) {
    console.log(err);
  }
}