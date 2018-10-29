import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Alert,ScrollView } from 'react-native'
import firebase from 'react-native-firebase'
import { Button,TouchableRipple } from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SignUpScreen extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null,
        errorMessage_signUp:null
    }

    handleSignUp = () => {
        this.setState({
            errorMessage_signUp: null
        })
        if (this.state.password1 === this.state.password2) (
            firebase
                .auth()
                .createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password1)
                .then(() => console.log("criado"))
                //.catch(error => this.setState({ errorMessage: error.message }))
                .catch(err => {
                    console.log("erro no cadastro========>",err.code)
                    this.handleSignUpError(err.code)
                })
        )
       else alert("Senhas diferentes!")
    }
    handleSignUpError = (error) => {
        console.log("handleSignUpError=======>",error)
        if(error==='auth/email-already-in-use'){
            this.setState({
                errorMessage_signUp:'Email já cadastrado!'
            })
        }
        else if(error==='auth/invalid-email'){
            this.setState({
                errorMessage_signUp:"Email inválido!"
            })
        }
        else if(error==='auth/weak-password'){
            this.setState({
                errorMessage_signUp:"Essa senha é muito fraca!"
            })
        }
        else{
            this.setState({
                errorMessage_signUp:"Erro ao cadastrar, tente novamente mais tarde"
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
                            placeholder="Senha"
                            placeholderTextColor="white"
                            onChangeText={password1 => this.setState({ password1 })}
                        />
                    </View>
                    <View style={styles.passwordContainer}>
                        <EvilIcons name="unlock" size={32} color="white" style={styles.unlockIcon} />
                        <TextInput
                            secureTextEntry
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Repita a senha"
                            placeholderTextColor="white"
                            onChangeText={password2 => this.setState({ password2 })}
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
        color: '#5861C5'
    },

})