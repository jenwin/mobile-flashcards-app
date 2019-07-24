import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
  green,
  red,
  white,
  orange,
  silver } from '../utils/colors'
import {
  clearLocalNotification,
  setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
   static navigationOptions = {
    title: "Quiz"
  }

  state = {
    questionIndex: 0,
    showQuestion: false,
    correct: 0,
    incorrect: 0
  }

  showAnswer = () => (
    !this.state.showQuestion ?
    this.setState({ showQuestion: true }) :
    this.setState({ showQuestion: false })
  )

  hideAnswer = () => (
    this.state.showQuestion ?
    this.setState({ showQuestion: false }) :
    this.setState({ showQuestion: true })
  )

  correctAnswer = () => {
    const { questionIndex } = this.state;
    this.setState(prevState => ({
      correct: prevState.correct + 1,
      questionIndex: questionIndex + 1
    }));
  }

  incorrectAnswer = () => {
    const { questionIndex } = this.state;
    this.setState(prevState => ({
      incorrect: prevState.incorrect + 1,
      questionIndex: questionIndex + 1
    }));
  }

  restartQuiz = () => {
    this.setState({
      questionIndex: 0,
      showQuestion: false,
      correct: 0,
      incorrect: 0
    })

    clearLocalNotification()
      .then(setLocalNotification);
  }

  render() {
    const { cardKey, navigation } = this.props;
    const { questionIndex, showQuestion, correct, incorrect } = this.state;
    const deckNumber = questionIndex + 1;
    const cardLength = cardKey.questions.length;
    const percentScore = ((correct/(correct + incorrect) * 100).toFixed(0)) + '%';

  if (cardLength === 0) {
    return (
      <View style={styles.emptyDeck}>
        <Text style={styles.emptyDeckText}>
          Sorry, you cannot take this quiz. There are no cards in the deck.
        </Text>
      </View>
    );
  }

  if (questionIndex === cardLength) {
    return (
      <View style={styles.scoreWrapper}>
        <Text style={styles.scoreText}>Your Score</Text>
        <View style={styles.resultsWrapper}>
          <Text style={styles.resultsPercent}>{percentScore}</Text>
          <Text style={styles.resultsCount}>{correct} out of {cardLength}</Text>
        </View>
        <TouchableOpacity
          onPress={this.restartQuiz}>
          <Text style={[styles.quizBtnStyles, styles.quizButtons, styles.restartQuiz]}>
            Restart Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Text style={[styles.quizBtnStyles, styles.quizButtons, styles.backToDeck]}>
            Back to Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.toggleWrapper}>
      <Text style={styles.remainingCardsNum}>
        {deckNumber} / {cardLength}
      </Text>

      <View style={styles.toggleAnswer}>
        { !showQuestion ? (
          <TouchableOpacity
            onPress={this.showAnswer}>
            <Text style={styles.toggleAnswer}>Show Answer</Text>
          </TouchableOpacity>
          ) : (
          <TouchableOpacity
            onPress={this.hideAnswer}>
            <Text style={styles.toggleAnswer}>Hide Answer</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.cardWrapper}>
          { !showQuestion ? (
            <Text style={styles.deckText}>
              {cardKey.questions[questionIndex].question}
            </Text>
            ) : (
            <Text style={styles.deckText}>
              {cardKey.questions[questionIndex].answer}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.quizBtnStyles, styles.quizCorrectColor]}
          onPress={this.correctAnswer}>
          <Text style={styles.answerText}>Correct</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quizBtnStyles, styles.quizIncorrectColor]}
          onPress={this.incorrectAnswer}>
          <Text style={styles.answerText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
}

const styles = StyleSheet.create({
  emptyDeck: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 30
  },
  emptyDeckText: {
    fontSize: 17
  },
  scoreWrapper: {
    alignItems: "center"
  },
  deckText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 55,
    marginTop: 55,
    paddingLeft: 45,
    paddingRight: 45
  },
  cardWrapper: {
    alignItems: "center",
    borderWidth: 0.5,
    width: 300,
    marginTop: 20,
    backgroundColor: silver,
    borderRadius: 5,
    borderColor: silver
  },
  toggleAnswer: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold"
  },
  quizBtnStyles: {
    fontSize: 22,
    borderRadius: 5,
    borderWidth: 0.5,
    padding: 10,
    marginBottom: 10,
    width: 130,
    height: 40
  },
  quizCorrectColor: {
    backgroundColor: green,
    borderColor: green,
    marginTop: 25,
    marginBottom: 13
  },
  quizIncorrectColor: {
    backgroundColor: red,
    borderColor: red,
    paddingBottom: 10
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 45
  },
  resultsWrapper: {
    backgroundColor: silver,
    borderRadius: 5,
    borderColor: silver,
    width: 300,
    marginTop: 30
  },
  resultsPercent: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 30
  },
  resultsCount: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 25,
    marginBottom: 30,
    fontWeight: "bold"
  },
  quizButtons: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 13
  },
  restartQuiz: {
    backgroundColor: red,
    borderColor: red,
    marginTop: 40,
    color: white
  },
  backToDeck: {
    backgroundColor: orange,
    borderColor: orange
  },
  toggleWrapper: {
    padding: 30 
  },
  remainingCardsNum: {
    fontSize: 15,
    fontWeight: "bold"
  },
  cardInfo: {
    alignItems: "center" 
  },
  answerText: {
    textAlign: "center",
    fontWeight: "bold"
  }
});

const mapStateToProps = (state, { navigation }) => ({
  cardKey: state[navigation.getParam("deckID")]
});

export default connect(mapStateToProps)(Quiz)