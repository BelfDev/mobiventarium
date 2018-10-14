import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'

export default class LoginScreen extends Component {
   
    state = {
        email: '',
        password: '',
        errorMessage: null,
        email_login: '',
        password_login: '',
        errorMessage_login: null
    }

    handleLogin = () => {
        const { email_login, password_login } = this.state
        firebase
            .auth()
            .signInAndRetrieveDataWithEmailAndPassword(email_login, password_login)
            .then((credential) => {
                console.log("==========autenticado=======")
                console.log('user=======>', credential.user.toJSON())
            })
            .catch(error => this.setState({ errorMessage: error.errorMessage_login }))
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
                        placeholder="Password"
                        onChangeText={password_login => this.setState({ password_login })}
                        value={this.state.password_login}
                    />
                    <Text onPress={()=>console.log("esqueci minha senha")} style={{fontSize:15,alignSelf:'flex-end',color:'gray',marginTop:5,paddingEnd:5}}> Esqueceu minha senha</Text>
                </View>
                {this.state.errorMessage_login &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage_login}
                    </Text>}
                <View style={{ height: '20%', width: '100%', alignItems: 'center'  }}>   
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={this.handleLogin}
                >
                    <Text style={{ fontSize: 18, color: '#5861C5' }}> Entrar </Text>
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