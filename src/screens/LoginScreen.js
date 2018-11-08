import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { Button } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Strings from "../utils/Strings";
import Colors from "../utils/Colors";
import images from "../assets";
import Navigator from "../navigation/Navigator";
import { observer, inject } from "mobx-react/native";
import FeedbackDialog from "../components/FeedbackDialog";
import { Navigation } from "react-native-navigation";
import { isEmpty, isNil } from "ramda";

@inject("sessionStore")
@observer
export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    emailLogIn: null,
    passwordLogIn: null,
    errorMessage_login: null,
    loading: false,
    feedbackMode: "loading",
    closeButtonDisabled: false,
    buttonPressed: false
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

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

  _isInputFieldEmpty = inputField => {
    return isNil(inputField) || isEmpty(inputField);
  };

  handleLogin = () => {
    const { sessionStore } = this.props;
    console.log(">>> LoginProps: ", this.props);

    if (
      !this._isInputFieldEmpty(this.state.emailLogIn) &&
      !this._isInputFieldEmpty(this.state.passwordLogIn)
    ) {
      this.setState({
        errorMessage_login: null,
        loading: true
      });
    } else {
      this.setState({
        loading: false,
        feedbackMode: "failure",
        errorMessage_login: "Por favor preencha os campos acima"
      });
      this.feedbackDialog.show();
    }

    if (!this.state.emailLogIn || !this.state.passwordLogIn) return null;
    const { emailLogIn, passwordLogIn } = this.state;

    sessionStore
      .signUserIn(emailLogIn, passwordLogIn)
      .then(() => {
        this._isMounted && this.setState({ loading: false, buttonPressed: true });
        console.log("==========autenticado=======");
        Navigator.goToInventoryScreen(this.props.componentId);
      })
      .catch(err => {
        this._isMounted && this.setState({ loading: false, feedbackMode: "failure" });
        console.log("erro no login=====>", err);
        this.handleLogInError(err.code);
        this.feedbackDialog.show();
      });
  };

  handleLogInError = error => {
    if (error === "auth/invalid-email") {
      this._isMounted && this.setState({
        errorMessage_login: Strings.logIn.invalidEmail
      });
    } else if (error === "auth/user-not-found") {
      this._isMounted && this.setState({
        errorMessage_login: Strings.logIn.userNotFound
      });
    } else if (error === "auth/wrong-password") {
      this._isMounted && this.setState({
        errorMessage_login: Strings.logIn.wrongPassword
      });
    } else if (error === "auth/user-disabled") {
      this._isMounted && this.setState({
        errorMessage_login: Strings.logIn.userDisabled
      });
    } else {
      this._isMounted && this.setState({
        errorMessage_login: Strings.logIn.logInError
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
              selectionColor={"white"}
              placeholder={Strings.logIn.firstPlaceholder}
              placeholderTextColor="white"
              onChangeText={emailLogIn => this._isMounted && this.setState({ emailLogIn })}
              value={this.state.emailLogIn}
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
              selectionColor={"white"}
              autoCapitalize="none"
              placeholder={Strings.logIn.secondPlaceholder}
              placeholderTextColor="white"
              onChangeText={passwordLogIn => this._isMounted && this.setState({ passwordLogIn })}
              value={this.state.passwordLogIn}
            />
          </View>
          <Text
            onPress={() => console.log("esqueci minha senha")}
            style={styles.forgot}
          >
            {" "}
            Esqueci minha senha
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {!this.state.loading ? (
            <Button
              mode="contained"
              compact
              style={styles.signInButton}
              onPress={this.handleLogin}
              disabled={this.state.buttonPressed}
            >
              <Text style={styles.buttonText}>{"entrar".toUpperCase()}</Text>
            </Button>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <FeedbackDialog
          mode={this.state.feedbackMode}
          description={this.state.errorMessage_login}
          onDismissed={this._onDimissed}
          onShown={this._onShown}
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
    color: "white",
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
    borderBottomColor: Colors.textInputBorderGray,
    borderBottomWidth: 1,
    color: "white",
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
  forgot: {
    fontSize: 15,
    alignSelf: "flex-end",
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
    height: 300,
    width: "100%",
    marginTop: 10,
    alignItems: "center"
  },
  signInButton: {
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
