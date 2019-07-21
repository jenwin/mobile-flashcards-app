import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet } from 'react-native'
import { white, black } from '../utils/colors'

class Card extends Component {
  render() {
    const { navigation, deckTitle, numCards, id } = this.props;

    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeckOptionsScreen', {
            EntryID: id,
            numCards: numCards,
            deckTitle: deckTitle })}>
          <Text style={styles.deckName}>{deckTitle}</Text>
          <Text style={styles.numCards}>{numCards} Cards</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 5,
    borderColor: black,
    borderWidth: 0.5,
    backgroundColor: white,
    padding: 20,
    width: 280,
    marginTop: 20
  },
  deckName: {
    fontSize: 25,
    textAlign: "center"
  },
  numCards: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14
  }
});

const mapStateToProps = (decks, { id }) => {
  return {
    id,
    deckTitle: decks[id].deckTitle,
    numCards: decks[id].questions.length
  }
}

export default connect(mapStateToProps)(Card)