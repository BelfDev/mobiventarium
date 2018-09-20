import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';

class WelcomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    firebase.auth().signInAnonymouslyAndRetrieveData()
      .then((credential) => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON())}
        this.setState({
          isAuthenticated: true,
        });
      });
  }

  render() {
    //If the user has not authenticated
    if (!this.state.isAuthenticated) {
      return null;
    }

    return (
      <View>
        <Text>Welcome to my awesome app!</Text>
        <Text>autenticado!</Text>
      </View>
    );
  }

}

export default WelcomeScreen;