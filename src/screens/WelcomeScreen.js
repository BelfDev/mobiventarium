import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class auth extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    email_login: '',
    password_login: '',
    errorMessage_login: null
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => console.log("criado"))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  handleLogin = () => {
    const { email_login, password_login } = this.state
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email_login, password_login)
      .then((credential) =>{
        console.log("==========autenticado=======")
        console.log('user=======>', credential.user.toJSON())
      })
      .catch(error => this.setState({ errorMessage: error.errorMessage_login }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20,color:'red'}}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />

        <View style={styles.separator}></View>
        
        <Text style={{fontSize: 20,color:'red'}}>Login</Text>
        {this.state.errorMessage_login &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage_login}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email_login => this.setState({ email_login })}
          value={this.state.email_login}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password_login => this.setState({ password_login })}
          value={this.state.password_login}
        />
        <Button title="Login" onPress={this.handleLogin} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  separator:{
    height:30,
    width:'100%',
    backgroundColor:'green',
    marginVertical:20,
  },
})