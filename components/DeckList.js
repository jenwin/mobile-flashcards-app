import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { lightOrange, white } from '../utils/colors'

import Card from './Card';

class DeckList extends Component {
  static navigationOptions = {
    headerTitle: "Decks"
  }

  componentDidMount() {
    const { receiveDecks } = this.props;
      getDecks().then(decks => receiveDecks(decks))
  }

  render() {
    const { navigation, decks } = this.props;

    return (
      <View style={styles.deckContainer}>
        {decks.length === 0 ?
          <Text>No Decks available. Add Decks.</Text> :
          <FlatList
            data={decks.map(id => { return { key: id } })}
            renderItem={({ item }) => (
              <Card
                id={item.key}
                navigation={navigation}
              />
            )}
            keyExtractor={(item, index) => item.key}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightOrange
  }
});

const mapStateToProps = decks => {
  return {
    decks: Object.keys(decks)
  }
}

const mapDispatchToProps = dispatch => ({
  receiveDecks: decks => dispatch(receiveDecks(decks))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)