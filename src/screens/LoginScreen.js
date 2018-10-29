import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'
import { Button } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: null,
        email_login: null,
        password_login: null,
        errorMessage_login: null,
    }

    handleLogin = () => {
        this.setState({
            errorMessage_login: null
        })
        if (!this.state.email_login || !this.state.password_login) return null
        const { email_login, password_login } = this.state
        firebase
            .auth()
            .signInAndRetrieveDataWithEmailAndPassword(email_login, password_login)
            .then((credential) => {
                console.log("==========autenticado=======")
                console.log('user=======>', credential.user.toJSON())
            })
            .catch(err => {
                console.log("erro no login=====>", err.code)
                this.handleLoginError(err.code)
            })
    }

    handleLoginError = (error) => {
        if (error === 'auth/invalid-email') {
            this.setState({
                errorMessage_login: "email inválido!"
            })
        }
        else if (error === 'auth/user-not-found') {
            this.setState({
                errorMessage_login: "Usuário não encontrado!"
            })
        }
        else if (error === 'auth/wrong-password') {
            this.setState({
                errorMessage_login: "Senha incorreta!"
            })
        }
        else if (error === 'auth/user-disabled') {
            this.setState({
                errorMessage_login: "Seu usuário foi desabilitado!"
            })
        }
        else {
            this.setState({
                errorMessage_login: "Erro no login, tente novamente mais tarde"
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profilePhoto}
                        source={require('../Images/avatar.png')}
                        resizeMode="contain"
                    />
                    <Text style={styles.profileName}> Olá, Pessoa</Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.emailContainer}>
                        <FontAwesome name="user-o" size={22} color="white" style={styles.emailIcon} />
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Email"
                            placeholderTextColor="white"
                            onChangeText={email_login => this.setState({ email_login })}
                            value={this.state.email_login}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <EvilIcons name="unlock" size={32} color="white" style={styles.unlockIcon} />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Senha"
                            placeholderTextColor="white"
                            onChangeText={password_login => this.setState({ password_login })}
                            value={this.state.password_login}
                        />
                    </View>
                    <Text onPress={() => console.log("esqueci minha senha")} style={styles.forgot}> Esqueci minha senha</Text>
                </View>
                {this.state.errorMessage_login &&
                    <Text style={styles.errorMessage}>
                        {this.state.errorMessage_login}
                    </Text>}
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        compact
                        style={styles.signUpButton}
                        onPress={this.handleLogin}
                    >
                        <Text style={styles.buttonText}> Entrar </Text>
                    </Button>
                </View>
            </ScrollView>


        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5861C5'
    },
    profileContainer: {
        height: '50%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    profilePhoto: {
        width: 120,
        height: 120,
        borderRadius: 120 / 2
    },
    profileName: {
        fontSize: 18,
        color: 'white',
        marginTop: 5
    },
    inputContainer: {
        height: '30%',
        width: '100%',
        paddingLeft: 10
    },
    emailContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailIcon: {
        left: 27,
        position: "absolute",
        marginRight: 20
    },
    textInput: {
        height: 50,
        width: '100%',
        borderBottomColor: '#FCFBFD',
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 80,
        fontSize: 20
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    unlockIcon: {
        left: 20,
        position: "absolute",
        marginRight: 20
    },
    forgot: {
        fontSize: 15,
        alignSelf: 'flex-end',
        color: 'gray',
        marginTop: 5,
        paddingEnd: 5
    },
    errorMessage: {
        color: 'red',
        marginLeft: 20,
        fontSize: 20
    },
    buttonContainer: {
        height: 200,
        width: '100%',
        marginTop: 10,
        alignContent: 'center',
        alignItems: "center"
    },
    signUpButton: {
        height: 60,
        width: '40%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50
    },
    buttonText: {
        fontSize: 18,
        color: '#5861C5'
    },

})