import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
import firebase from "react-native-firebase";
import { Button } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Strings from "../utils/Strings";
import Colors from "../utils/Colors";
import AuthenticationApiService from "../data/remote/services/AuthenticationApiService";
import images from "../assets";
import FeedbackDialog from "../components/FeedbackDialog";
import Navigator from "../navigation/Navigator";
import { observer, inject } from "mobx-react/native";
import { Navigation } from "react-native-navigation";
import { isEmpty, isNil } from "ramda";

@inject("sessionStore")
@observer
export default class SignUpScreen extends Component {
  state = {
    email: "",
    errorMessage_signUp: null,
    password: "",
    confirmedPassword: "",
    loading: false,
    feedbackMode: "loading",
    closeButtonDisabled: false,
    buttonPressed: false
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  _isInputFieldEmpty = inputField => {
    return isNil(inputField) || isEmpty(inputField);
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  async componentDidAppear() {
    if (this._isMounted) {
      this.setState({
        buttonPressed: false
      });
    }
  }

  handleSignUp = () => {
    const { sessionStore } = this.props;
    if (
      !this._isInputFieldEmpty(this.state.email) &&
      !this._isInputFieldEmpty(this.state.password) &&
      !this._isInputFieldEmpty(this.state.confirmedPassword)
    ) {
      this._isMounted &&
        this.setState({
          errorMessage_signUp: null,
          loading: true
        });
    } else {
      this._isMounted &&
        this.setState({
          loading: false,
          feedbackMode: "failure",
          errorMessage_signUp: "Por favor preencha os campos acima"
        });
        this.feedbackDialog.show();
    }

    if (
      !this.state.email ||
      !this.state.password ||
      !this.state.confirmedPassword
    ) {
      return null;
    }

    if (this.state.password === this.state.confirmedPassword) {
      sessionStore
        .signUserUp(this.state.email, this.state.password)
        .then(() => {
          this._isMounted &&
            this.setState({
              loading: false,
              buttonPressed: true
            });
          console.log("==========autenticado=======");
          Navigator.goToInventoryScreen(this.props.componentId);
        })
        .catch(err => {
          console.log("SIGNUP ERROR: ", err);
          this._isMounted &&
            this.setState({
              loading: false,
              feedbackMode: "failure"
            });
          console.log("erro no cadastro========>", err.code);
          this.handleSignUpError(err.code);
          this.feedbackDialog.show();
        });
    } else {
        this._isMounted && this.setState({
        errorMessage_signUp: Strings.signUp.differentPassword,
        loading: false
      });
    }
  };
  handleSignUpError = error => {
    if (error === "auth/email-already-in-use") {
        this._isMounted && this.setState({
        errorMessage_signUp: Strings.signUp.emailAlreadyInUse
      });
    } else if (error === "auth/invalid-email") {
        this._isMounted && this.setState({
        errorMessage_signUp: Strings.signUp.invalidEmail
      });
    } else if (error === "auth/weak-password") {
        this._isMounted && this.setState({
        errorMessage_signUp: Strings.signUp.weakPassword
      });
    } else {
        this._isMounted && this.setState({
        errorMessage_signUp: Strings.signUp.signUpError
      });
    }
  };
  _onDimissed = () => {
    console.log(">>>> onDimissed!");
  };

  _onShown = () => {
    console.log(">>>> onShow!");
  };
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
            <FontAwesome
              name="user-o"
              size={22}
              color="white"
              style={styles.emailIcon}
            />
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder={Strings.signUp.firstPlaceholder}
              keyboardType="email-address"
              selectionColor={"white"}
              placeholderTextColor="white"
              onChangeText={email => this._isMounted && this.setState({ email })}
            />
          </View>
          <View style={styles.passwordContainer}>
            <EvilIcons
              name="unlock"
              size={32}
              color="white"
              style={styles.unlockIcon}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              selectionColor={"white"}
              placeholder={Strings.signUp.secondPlaceholder}
              placeholderTextColor="white"
              onChangeText={password => this._isMounted && this.setState({ password })}
            />
          </View>
          <View style={styles.passwordContainer}>
            <EvilIcons
              name="unlock"
              size={32}
              color="white"
              style={styles.unlockIcon}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              selectionColor={"white"}
              placeholder={Strings.signUp.thirdlaceholder}
              placeholderTextColor="white"
              onChangeText={confirmedPassword =>
                this._isMounted && this.setState({ confirmedPassword })
              }
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {!this.state.loading ? (
            <Button
              mode="contained"
              compact
              style={styles.signUpButton}
              onPress={this.handleSignUp}
              disabled={this.state.buttonPressed}
            >
              <Text style={styles.buttonText}>{"cadastrar".toUpperCase()}</Text>
            </Button>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <FeedbackDialog
          mode={this.state.feedbackMode}
          description={this.state.errorMessage_signUp}
          onDismissed={() => this._onDimissed()}
          onShown={() => this._onShown()}
          ref={feedbackDialog => {
            this.feedbackDialog = feedbackDialog;
          }}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPurple
  },
  profileContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
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
    height: "30%",
    width: "100%",
    paddingLeft: 10
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  emailIcon: {
    left: 27,
    position: "absolute",
    marginRight: 20
  },
  textInput: {
    height: 50,
    width: "100%",
    color: "white",
    borderBottomColor: Colors.textInputBorderGray,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 80,
    fontSize: 20
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  unlockIcon: {
    left: 20,
    position: "absolute",
    marginRight: 20
  },
  errorMessage: {
    color: "red",
    marginLeft: 20,
    fontSize: 20
  },
  buttonContainer: {
    height: 250,
    width: "100%",
    marginTop: 35,
    alignItems: "center"
  },
  signUpButton: {
    alignSelf: "center",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 18,
    color: Colors.backgroundPurple
  }
});
