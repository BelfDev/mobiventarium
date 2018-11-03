import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Button } from 'react-native-paper';
import NavigationStyle from "../navigation/NavigationStyle";
import Images from '../assets';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.pushLoginScreen = this.pushLoginScreen.bind(this);
    this.pushSignUpScreen = this.pushSignUpScreen.bind(this);
  }
  pushLoginScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.mobiventarium.LoginScreen',
        options: NavigationStyle.LoginScreen
      }
    });
  }
  pushSignUpScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.mobiventarium.SignUpScreen',
        options: NavigationStyle.SignUpScreen
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.mainIcon}
            resizeMode="contain"
          />
          <Text style={styles.title}>INVENTORY</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { marginTop: 10 }]}>Controle de</Text>
          <Text style={[styles.text, { marginTop: 5 }]}>Inventário</Text>
          <Text style={[styles.secondaryText, { marginTop: 15 }]}>Chega de devices</Text>
          <Text style={[styles.secondaryText, { marginTop: 5 }]}>perdidos</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.signUpContainer}>
            <Button
              compact
              style={styles.signUpButton}
              onPress={this.pushSignUpScreen}
            >
              <Text style={styles.signUpText}> Cadastrar </Text>
            </Button>
          </View>
          <View style={styles.loginContainer}>
            <Button
              mode="contained"
              compact
              style={styles.loginButton}
              onPress={this.pushLoginScreen}
            >
              <Text style={styles.loginText}> Login </Text>
            </Button>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#636BD2'
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    color: '#E2E4F6'
  },
  textContainer: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 15,
    color: '#E2E4F6',
    marginTop: 15,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  buttonContainer:{
    height: '10%', 
    width: '100%', 
    flexDirection: 'row', 
    backgroundColor: 'white' 
  },
  signUpContainer:{
    width: '50%', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  signUpText:{
    fontSize: 18, 
    color: '#5861C5'
  },
  separator: {
    height: 30,
    width: '100%',
    backgroundColor: 'green',
    marginVertical: 20,
  },
  signUpButton: {
    flex: 1,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer:{
    width: '50%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  loginText:{
    color: 'white', 
    fontSize: 18
  },
  loginButton: {
    width: '70%',
    backgroundColor: '#5861C5',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    marginVertical: 5

  },
})