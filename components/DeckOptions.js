import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated } from 'react-native'
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { removeDeck } from '../actions'
import { removeCardDeck } from '../utils/api'
import { red, white, black } from '../utils/colors'

import AddCard from './AddCard';
import Quiz from './Quiz';
import Card from './Card';

class DeckOptions extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("deckTitle")
  });

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 255,
      duration: 1300
    }).start();
  }

  handleDeleteDeck = deck => {
    const { navigation, removeDeck } = this.props;
    navigation.navigate('DeckListScreen');
    //redux and async storage
    removeDeck(deck);
    removeCardDeck(deck);
  }

  render() {
    const { navigation } = this.props;
    const deckTitle = navigation.state.params.deckTitle;
    const numCards = navigation.state.params.numCards;
    const deckEntry = navigation.state.params.EntryID;
    const changeColor = this.animatedValue.interpolate({
      inputRange: [0, 255],
      outputRange: [
       'rgb(117, 255, 179)',
       'rgb(246, 255, 196)'
       ]
    });
    const colorAnimation = {
      backgroundColor: changeColor
    };

    return (
      <Animated.View style={[styles.buttonContainer, colorAnimation]}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.deckTitle}>{deckTitle}</Text>
          <Text style={styles.card}>{numCards} Cards</Text>
          <View style={styles.addCardView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCardScreen', { deckID: deckEntry, deckTitle: deckTitle })}>
              <Text style={styles.submitBtn}>Add Card</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.startQuizView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('StartQuizScreen', { deckID: deckEntry })}>
              <Text style={[styles.submitBtn, styles.quizBtn]}>Start a Quiz</Text>
            </TouchableOpacity>
            <View style={styles.deleteDeckView}>
              <TouchableOpacity
                onPress={() => this.handleDeleteDeck(deckEntry)}>
                <Text style={styles.deleteDeckBtn}>DELETE DECK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  deckTitle: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 20,
    fontWeight: "bold"
  },
  card: {
    fontSize: 17,
    textAlign: "center",
    paddingBottom: 40,
    fontWeight: "bold"
  },
  addCardView: {
    marginBottom: 15,
    alignItems: "center" 
  },
  submitBtn: {
    fontSize: 17,
    padding: 12,
    width: 130,
    textAlign: "center",
    borderRadius: 5,
    backgroundColor: black,
    color: white
  },
  startQuizView: {
    alignItems: "center"
  },
  deleteDeckView: {
    justifyContent: "center",
    marginTop: 60
  },
  deleteDeckBtn: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    width: 200,
    textAlign: "center",
    color: red
  }
});

export default connect(null, { removeDeck })(DeckOptions)