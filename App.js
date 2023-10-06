import React, { Component } from 'react'
import {
  AppRegistry,
  StatusBar,
  View,
  Platform } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator } from 'react-navigation'
import {
  MaterialCommunityIcons,
  MaterialIcons } from '@expo/vector-icons'
import { black, white, gray } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import Constants from 'expo-constants'

import DeckList from './components/DeckList'
import DeckOptions from './components/DeckOptions'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FlashCardsStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const BottomNav = createAppContainer(createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) =>
        <MaterialCommunityIcons
          name="cards"
          size={30}
          color={tintColor}
        />
    }
  },
  AddDeck: {
    screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) =>
        <MaterialIcons
          name="add-circle"
          size={30}
          color={tintColor}
        />
      }
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? gray : black
  }
}));

const RootNav = createAppContainer(createStackNavigator({
  Home: {
    screen: BottomNav,
    navigationOptions: {
      title: 'Mobile FlashCards'
    }
  },
  DeckListScreen: DeckList,
  DeckOptionsScreen: DeckOptions,
  AddCardScreen: AddCard,
  StartQuizScreen: Quiz,
  AddDeckScreen: AddDeck
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: black,
      marginTop: -20
    },
    headerTintColor: white,
    headerTitleStyle: { fontWeight: 'bold' }
  }
}));

class Main extends Component {
   componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <FlashCardsStatusBar
          backgroundColor={gray}
          barStyle="light-content"
        />
        <GestureHandlerRootView>
          <RootNav />
        </GestureHandlerRootView>
      </Provider>
    );
  }
}

export default Main
AppRegistry.registerComponent('Main', () => Main)