import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import { goToAuth, goHome } from '../Navigation/Navigation'

import { USER_KEY } from '../stores/LoginStore'

export default class StartScreen extends Component {
    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent: true,
        topBar: {
          visible: false,
          drawBehind: true,
        transparent: true,
        elevation: 0,
        background: {
          color: 'green',
        },
        }
      };
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', user)
      if (user) {
        goHome()
      } else {
        goToAuth()
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  }
})