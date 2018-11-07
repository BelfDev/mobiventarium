import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Button } from 'react-native-paper';
import NavigationStyle from "../navigation/NavigationStyle";
import Images from '../assets';
import Colors from '../utils/Colors'

export default class OnboardingScreen extends Component {

  state = {
    buttonPressed: false,
  }

  constructor(props) {
    super(props);
    this.pushLoginScreen = this.pushLoginScreen.bind(this);
    this.pushSignUpScreen = this.pushSignUpScreen.bind(this);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this._isMounted = true;
  };

  componentWillUnmount() {
    this._isMounted = false
  }
  

  async componentDidAppear() {
    if (this._isMounted) {
      this.setState({
        buttonPressed: false
      });
    }
  }

  pushLoginScreen() {
    this._isMounted && this.setState({
      buttonPressed: true
    })
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.mobiventarium.LoginScreen',
        options: NavigationStyle.LoginScreen
      }
    });
  }
  pushSignUpScreen() {
    this._isMounted && this.setState({
      buttonPressed: true
    })
    Navigation.push(this.props.componentId, {
      component: {
        name: 'com.mobiventarium.SignUpScreen',
        options: NavigationStyle.SignUpScreen
      }
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={Images.mainIcon}
            resizeMode="contain"
          />
          <Text style={styles.title}>INVENTORY</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { marginTop: 10 }]}>Alugue qualquer coisa</Text>
          <Text style={[styles.secondaryText, { marginTop: 15 }]}>Chega de devices perdidos</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.signUpContainer}>
            <Button
              compact={true}
              style={styles.signUpButton}
              onPress={this.pushSignUpScreen}
              disabled={this.state.buttonPressed}
            >
              <Text style={styles.signUpText}>  {'cadastrar'.toUpperCase()} </Text>
            </Button>
          </View>
          <View style={styles.divider}/>
          <View style={styles.loginContainer}>
            <Button
              mode="contained"
              compact
              style={styles.loginButton}
              onPress={this.pushLoginScreen}
              disabled={this.state.buttonPressed}
            >
              <Text style={styles.loginText}> {'login'.toUpperCase()} </Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
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
    height: '36%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 18,
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
    height: '14%',
    width: '100%',
    flexDirection: 'row', 
    backgroundColor: 'white' 
  },
  signUpContainer:{
    width: '50%', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  divider: {
    height: '50%',
    width: '0.4%',
    alignSelf: 'center',
    backgroundColor: Colors.dividerLightGray,
  },
  loginContainer:{
    width: '50%', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  signUpText:{
    fontSize: 18, 
    color: Colors.vividPurple
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
  loginText:{
    color: 'white', 
    fontSize: 18,
    fontWeight: '200',
  },
  loginButton: {
    width: '70%',
    backgroundColor: Colors.vividPurple,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
})