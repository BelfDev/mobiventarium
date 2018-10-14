import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Navigation } from 'react-native-navigation'

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);

    this.pushLoginScreen = this.pushLoginScreen.bind(this);
    this.pushSignUpScreen = this.pushSignUpScreen.bind(this);
  }
  pushLoginScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'LoginScreen',
        options: {
          buttonColor: 'black',
          topBar: {
            visible: true,
            background: {
              color: 'transparent',
            },
          },
        }
      }
    });
  }
  pushSignUpScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'SignUpScreen',
        options: {
          topBar: {
            visible: true,
            background: {
              color: 'transparent',
            },
          },
        }
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: '50%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('../Images/login1.png')}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 16, marginTop: 10, color: '#E2E4F6' }}>INVENTORY</Text>
        </View>
        <View style={{ height: '40%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, color: '#FFFFFF', textAlign: 'center', marginTop: 10, }}>Controle de</Text>
          <Text style={{ fontSize: 30, color: '#FFFFFF', marginTop: 5, textAlign: 'center' }}>Inventário</Text>
          <Text style={{ fontSize: 15, color: '#E2E4F6', marginTop: 15, textAlign: 'center' }}>Chega de devices</Text>
          <Text style={{ fontSize: 15, color: '#E2E4F6', marginTop: 5, textAlign: 'center' }}>perdidos</Text>
        </View>
        <View style={{ height: '10%', width: '100%', flexDirection: 'row', backgroundColor: 'white' }}>
      <View style={{width:'50%',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={this.pushSignUpScreen}
          >
            <Text style={{fontSize:18,color:'#5861C5'}}> Cadastrar </Text>
          </TouchableOpacity>
          </View>
          <View style={{height:'50%',width:1,backgroundColor:'#F2F2F2',alignSelf:'center'}}></View>
          <View style={{width:'50%',backgroundColor:' green',justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.pushLoginScreen}
          >
            <Text style={{color:'white',fontSize:18}}> Login  </Text>
          </TouchableOpacity>
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
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  separator: {
    height: 30,
    width: '100%',
    backgroundColor: 'green',
    marginVertical: 20,
  },
  signUpButton: {
    flex:1,
    width:'100%',
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
  },
  loginButton: {
    
    width:'70%',
    backgroundColor: '#5861C5',
    padding: 15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50
    
  },
})