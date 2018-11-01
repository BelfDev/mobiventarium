import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image,ScrollView } from 'react-native'
import firebase from 'react-native-firebase'
import { Button } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Strings from "../utils/Strings"
import Colors from "../utils/Colors"
import AuthenticationService from "../services/AuthenticationService";

export default class SignUpScreen extends Component {
    state = {
        email: '',
        errorMessage_signUp: null,
        password:'',
        confirmedPassword:''
    }

    handleSignUp = () => {
        if (!this.state.email || !this.state.password || !this.state.confirmedPassword) return null
        this.setState({
            errorMessage_signUp: null
        })
        if (this.state.password === this.state.confirmedPassword) (
            AuthenticationService.signUp(this.state.email, this.state.password)
                .then(() => console.log("criado"))
                .catch(err => {
                    console.log("erro no cadastro========>",err.code)
                    this.handleSignUpError(err.code)
                })
        )
       else {
        this.setState({
            errorMessage_signUp: Strings.signUp.differentPassword
        })
       }
    }
    handleSignUpError = (error) => {
        if(error==='auth/email-already-in-use'){
            this.setState({
                errorMessage_signUp: Strings.signUp.emailAlreadyInUse
            })
        }
        else if(error==='auth/invalid-email'){
            this.setState({
                errorMessage_signUp: Strings.signUp.invalidEmail
            })
        }
        else if(error==='auth/weak-password'){
            this.setState({
                errorMessage_signUp:Strings.signUp.weakPassword
            })
        }
        else{
            this.setState({
                errorMessage_signUp:Strings.signUp.signUpError
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
                            placeholder= {Strings.signUp.firstPlaceholder}
                            keyboardType="email-address"
                            placeholderTextColor="white"
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <EvilIcons name="unlock" size={32} color="white" style={styles.unlockIcon} />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder={Strings.signUp.secondPlaceholder}
                            placeholderTextColor="white"
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <EvilIcons name="unlock" size={32} color="white" style={styles.unlockIcon} />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder={Strings.signUp.thirdlaceholder}
                            placeholderTextColor="white"
                            onChangeText={confirmedPassword => this.setState({ confirmedPassword })}
                        />
                    </View>
                </View>
                {this.state.errorMessage_signUp &&
                    <Text style={styles.errorMessage}>
                        {this.state.errorMessage_signUp}
                    </Text>}
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        compact
                        style={styles.signUpButton}
                        onPress={this.handleSignUp}
                    >
                        <Text style={styles.buttonText}> Cadastrar </Text>
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
        color: Colors.white,
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
    errorMessage: {
        color: 'red',
        marginLeft: 20,
        fontSize: 20
    },
    buttonContainer: {
        height: 220, 
        width: '100%',
        marginTop:25,
        alignContent:'center',
        alignItems:"center" 
    },
    signUpButton: {
        height: 60,
        width: '40%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
       
    },
    buttonText: {
        fontSize: 18,
        color: Colors.backgroundPurple
    },

})