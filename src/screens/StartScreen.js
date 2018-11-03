import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native'

import Navigator from '../navigation/Navigator'

import { USER_KEY } from '../data/remote/stores/LoginStore'

export default class StartScreen extends Component {
 
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY)
      console.log('user: ', user)
      if (user) {
        Navigator.goToInventoryScreen()
      } else {
        Navigator.goToAuthenticationScreen()
      }
    } catch (err) {
      console.log('error: ', err)
      Navigator.goToAuthenticationScreen()
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