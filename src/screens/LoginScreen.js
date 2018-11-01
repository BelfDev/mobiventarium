import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'
import { Button } from 'react-native-paper'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Strings from "../utils/Strings"
import Colors from "../utils/Colors"
import AuthenticationService from "../services/AuthenticationService";
import images from '../assets';

export default class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: null,
        emailLogIn: null,
        passwordLogIn: null,
        errorMessage_login: null,
    }

    handleLogin = () => {
        this.setState({
            errorMessage_login: null
        })
        if (!this.state.emailLogIn || !this.state.passwordLogIn) return null
        const { emailLogIn, passwordLogIn } = this.state
        AuthenticationService.login(emailLogIn, passwordLogIn)
            .then((credential) => {
                console.log("==========autenticado=======")
                console.log('user=======>', credential.user.toJSON())
            })
            .catch(err => {
                console.log("erro no login=====>", err.code)
                this.handleLogInError(err.code)
            })
    }

    handleLogInError = (error) => {
        if (error === 'auth/invalid-email') {
            this.setState({
                errorMessage_login: Strings.logIn.invalidEmail
            })
        }
        else if (error === 'auth/user-not-found') {
            this.setState({
                errorMessage_login: Strings.logIn.userNotFound
            })
        }
        else if (error === 'auth/wrong-password') {
            this.setState({
                errorMessage_login: Strings.logIn.wrongPassword
            })
        }
        else if (error === 'auth/user-disabled') {
            this.setState({
                errorMessage_login: Strings.logIn.userDisabled
            })
        }
        else {
            this.setState({
                errorMessage_login: Strings.logIn.logInError
            })
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.profilePhoto}
                        source={images.avatarPlaceholder}
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
                            placeholder={Strings.logIn.firstPlaceholder}
                            placeholderTextColor="white"
                            onChangeText={emailLogIn => this.setState({ emailLogIn })}
                            value={this.state.emailLogIn}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <EvilIcons name="unlock" size={32} color="white" style={styles.unlockIcon} />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder={Strings.logIn.secondPlaceholder}
                            placeholderTextColor="white"
                            onChangeText={passwordLogIn => this.setState({ passwordLogIn })}
                            value={this.state.passwordLogIn}
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
        backgroundColor: Colors.backgroundPurple
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
        borderBottomColor: Colors.textInputBorderGray,
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
        color: Colors.iosGray,
        marginTop: 5,
        paddingEnd: 5
    },
    errorMessage: {
        color: Colors.red,
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
        backgroundColor: Colors.white,
        borderRadius: 50
    },
    buttonText: {
        fontSize: 18,
        color: Colors.backgroundPurple
    },

})