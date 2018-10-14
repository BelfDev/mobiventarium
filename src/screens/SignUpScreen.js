import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

export default class SignUpScreen extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    email_login: '',
    password_login: '',
    errorMessage_login: null
  }

  handleSignUp = () => {
    if(this.state.password1===this.state.password2)(
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => console.log("criado"))
      .catch(error => this.setState({ errorMessage: error.message }))
    )
    alert("Senhas diferentes!")
  }
  
  render() {
    return (
        <View style={styles.container}>
            <View style={{ height: '50%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ width: 120, height: 120, borderRadius: 120 / 2 }}
                    source={require('../Images/avatar.png')}
                    resizeMode="contain"
                />
                <Text style={{ fontSize: 18, color: 'white', marginTop: 5 }}> Olá, Pessoa</Text>
            </View>

            <View style={{ height: '30%', width: '100%', paddingLeft: 10 }}>
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
                    placeholder= "Password"
                    onChangeText={password1 => this.setState({ password1 })}
                    value={this.state.password_login}
                />
                 <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Repeat Password"
                    onChangeText={password2 => this.setState({ password2 })}
                    value={this.state.password_login}
                />
            </View>
            <View style={{ height: '20%', width: '100%', alignItems: 'center'  }}>   
            <TouchableOpacity
                style={styles.signUpButton}
                onPress={this.handleSignUp}
            >
                <Text style={{ fontSize: 18, color: '#5861C5' }}> Cadastrar </Text>
            </TouchableOpacity>
            </View>
        </View>


    )
}
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#5861C5'
},
textInput: {
    height: 50,
    width: '100%',
    borderBottomColor: '#FCFBFD',
    borderBottomWidth: 1
},
signUpButton: {
   height:60,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderRadius:50
},

})