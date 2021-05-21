import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
const NOTIFICATION_KEY = 'notifications:decks'

export function createNotification() {
  return {
    title: "Ready to Study?",
    body: "What do you want to study today?",
    ios: {
      sound: true
    },
    android: true,
    priority: 'high',
    sticky: false,
    vibrate: true
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
   .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(45);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                time: tomorrow,
                repeat: 'day'
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }).catch(err => {
              console.log(err)});
      }
    }).catch(err => {
      console.log(err)});
}