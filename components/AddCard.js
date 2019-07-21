import React, { Component } from 'react'
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'
import { black, white, purple } from '../utils/colors'

class AddCard extends Component {
  static navigationOptions = {
    title: "Add Card"
  }

  state = {
    question: "",
    answer: ""
  }

  //user input
  handleAddCard = cardID => {
    const { addCard, navigation }  = this.props;
    const { question, answer } = this.state;
    const card = { question, answer }
    const cardDeckTitle = navigation.state.params.deckTitle;
    navigation.goBack();
    //redux store and aysnc storage
    addCard(cardID, card);
    saveCard(cardID, cardDeckTitle, card);
    //reset questions and answers
    this.setState({
      question: "",
      answer: ""
    });
  }

  render() {
    const { question, answer } = this.state;
    const { navigation } = this.props;
    const disabled = (question === "" || answer === "") ? true : false;
    const cardEntry = navigation.state.params.deckID;

    return (
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
        <Text style={styles.addCardTitle}>ADD QUESTION AND ANSWER</Text>
          <TextInput
            style={styles.userInput}
            placeholder="Enter Question Here"
            value={question}
            onChangeText={(question) => this.setState({ question })}
          />
          <TextInput
            style={styles.userInput}
            placeholder="Enter Answer Here"
            value={answer}
            onChangeText={(answer) => this.setState({ answer })}
          />
        <TouchableOpacity
          onPress={() => this.handleAddCard(cardEntry)} disabled={disabled}>
          <Text style={styles.inputSubmitBtn}>SUBMIT</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: purple
  },
  addCardTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 15,
    fontSize: 18
  },
  userInput: {
    borderColor: black,
    borderRadius: 5,
    borderWidth: 0.5,
    width: 300,
    height: 40,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: white
  },
  inputSubmitBtn: {
    padding: 10,
    backgroundColor: black,
    borderRadius: 5,
    width: 80,
    textAlign: "center",
    color: white
  }
});

const mapDispatchToProps = dispatch => ({
  addCard: (id, card) => dispatch(addCard(id, card))
});

export default connect(null, mapDispatchToProps)(AddCard)