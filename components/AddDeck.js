import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { createDeck } from '../actions'
import { saveDeck } from '../utils/api'
import idGenerator from 'react-id-generator'
import { blue, white, black } from '../utils/colors'

class AddDeck extends Component {
  state = {
    deckTitle: "",
    id: idGenerator()
  }

  //user input
  handleCreateDeck = () => {
    const { createDeck, navigation } = this.props;
    const { id, deckTitle } = this.state;
    navigation.navigate('DeckListScreen');
    //redux and async storage
    createDeck(id, deckTitle);
    saveDeck(id, deckTitle);
    //reset values
    this.setState({
      deckTitle: "",
      id: idGenerator()
    });
  }

  render() {
    const { deckTitle } = this.state;
    const disabled = deckTitle === "" ? true : false;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.addDeckContainer}>
        <Text style={styles.addDeckTitle}>What is the title of your new Deck?</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="Enter Question Here"
          maxLength={15}
          value={deckTitle}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
        />
        <TouchableOpacity
          onPress={this.handleCreateDeck} disabled={disabled}>
          <Text style={styles.createDeckBtn}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  addDeckContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue
  },
  addDeckTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 17
  },
  inputContainer: {
    borderColor: black,
    borderWidth: 0.5,
    width: 300,
    height: 40,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: white
  },
  createDeckBtn: {
    color: white,
    padding: 10,
    backgroundColor: black,
    borderRadius: 5,
    width: 100,
    textAlign: "center"
  }
});

export default connect(null, { createDeck })(AddDeck)